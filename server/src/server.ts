import "dotenv/config";

import { app } from "./app";
import { env } from "./env";
import { db } from "./db";
import { links } from "./db/schema";

async function bootstrap() {
  try {
    await db.select().from(links).limit(1);

    console.log("✅ Database connected");

    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on port ${env.PORT}`);
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();


