import fastify from "fastify";
import cors from "@fastify/cors";
import { linksRoutes } from "./routes/links";

export const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(linksRoutes);