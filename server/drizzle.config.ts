import "dotenv/config";
import type { Config } from "drizzle-kit"

export default {
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
} satisfies Config