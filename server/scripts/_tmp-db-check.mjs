import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();
try {
  await p.$queryRaw`SELECT 1`;
  console.log("QUERY OK");
  await p.device.create({
    data: {
      deviceCode: "t" + Date.now(),
      userCode: "U" + String(Date.now()).slice(-6),
      expiresAt: new Date(Date.now() + 60_000),
      status: "pending",
    },
  });
  console.log("DEVICE CREATE OK");
} catch (e) {
  console.error("FAIL", e.message);
  if (e.code) console.error("CODE", e.code);
} finally {
  await p.$disconnect();
}
