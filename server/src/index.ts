import { createApp } from "./app.js";
import { env } from "./config.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Roboticela DevKit API listening on http://localhost:${env.PORT}`);
  console.log(`  Health:  http://localhost:${env.PORT}/health`);
  console.log(`  Auth:    http://localhost:${env.PORT}/auth/device`);
  if (env.NODE_ENV === "development") {
    console.log(`  Mode:    development (Stripe optional, dev license activation enabled)`);
  }
});
