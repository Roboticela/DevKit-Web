import { Router } from "express";
import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { env, LICENSE_PRICE_USD } from "../config.js";
import { ApiError, assertFound } from "../lib/errors.js";
import { requireAuth, requireProjectAccess, type AuthedRequest } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";
import { param } from "../lib/params.js";

export const licensesRouter = Router();

function getStripe(): Stripe | null {
  if (!env.STRIPE_SECRET_KEY) return null;
  return new Stripe(env.STRIPE_SECRET_KEY);
}

licensesRouter.use(requireAuth);

licensesRouter.post("/:projectId/checkout", requireProjectAccess, async (req: AuthedRequest, res, next) => {
  try {
    const project = assertFound(
      await prisma.project.findUnique({ where: { id: param(req.params.projectId) }, include: { license: true } }),
      "Project not found."
    );

    if (project.license?.status === "active") {
      throw new ApiError("This project already has an active license.", 409, "LICENSE_ACTIVE");
    }

    const stripe = getStripe();
    if (!stripe || !env.STRIPE_PRICE_ID) {
      // Dev mode: activate license without Stripe
      if (env.NODE_ENV === "development") {
        await prisma.license.upsert({
          where: { projectId: project.id },
          create: { projectId: project.id, status: "active", issuedAt: new Date() },
          update: { status: "active", issuedAt: new Date() },
        });
        await auditLog(req, "license.dev_activate", project.id);
        return res.json({
          devMode: true,
          message: "License activated (development mode — no Stripe configured).",
          license: { status: "active" },
        });
      }
      throw new ApiError("Payment processing is not configured.", 503, "PAYMENT_UNAVAILABLE");
    }

    const payment = await prisma.payment.create({
      data: { projectId: project.id, amountCents: env.LICENSE_PRICE_CENTS, status: "pending" },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${req.headers.origin ?? "http://localhost:3000"}/license/success?project=${project.id}`,
      cancel_url: `${req.headers.origin ?? "http://localhost:3000"}/license/cancel?project=${project.id}`,
      metadata: { projectId: project.id, paymentId: payment.id },
      customer_email: req.userEmail,
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripeSessionId: session.id },
    });

    await auditLog(req, "license.checkout", project.id, { sessionId: session.id });
    res.json({ checkoutUrl: session.url, sessionId: session.id, priceUsd: LICENSE_PRICE_USD });
  } catch (e) {
    next(e);
  }
});

licensesRouter.post("/webhook/stripe", async (req, res) => {
  const stripe = getStripe();
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: "Stripe not configured." });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") {
    return res.status(400).json({ error: "Missing signature." });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      (req as { rawBody?: Buffer }).rawBody ?? JSON.stringify(req.body),
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const projectId = session.metadata?.projectId;
      const paymentId = session.metadata?.paymentId;
      if (projectId) {
        await prisma.license.upsert({
          where: { projectId },
          create: { projectId, status: "active", issuedAt: new Date() },
          update: { status: "active", issuedAt: new Date() },
        });
      }
      if (paymentId) {
        await prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: "completed",
            stripePaymentId: session.payment_intent as string | undefined,
          },
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    res.status(400).json({ error: "Webhook verification failed." });
  }
});

licensesRouter.get("/:projectId/status", requireProjectAccess, async (req, res, next) => {
  try {
    const project = assertFound(
      await prisma.project.findUnique({ where: { id: param(req.params.projectId) }, include: { license: true } }),
      "Project not found."
    );
    res.json({
      projectId: project.id,
      projectName: project.name,
      status: project.license?.status ?? "pending",
      active: project.license?.status === "active",
      issuedAt: project.license?.issuedAt,
      priceUsd: LICENSE_PRICE_USD,
      oneTime: true,
    });
  } catch (e) {
    next(e);
  }
});
