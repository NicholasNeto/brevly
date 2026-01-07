import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { links } from "../db/schema";
import { eq } from "drizzle-orm";

export async function linksRoutes(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
    // 1. Validação do body
    const bodySchema = z.object({
      originalUrl: z.string().url(),
      shortUrl: z
        .string()
        .min(3)
        .regex(/^[a-zA-Z0-9-_]+$/, {
          message: "Short URL mal formatada",
        }),
    });

    const { originalUrl, shortUrl } = bodySchema.parse(request.body);

    // 2. Verificar se shortUrl já existe
    const existingLink = await db
      .select()
      .from(links)
      .where(eq(links.shortUrl, shortUrl))
      .limit(1);

    if (existingLink.length > 0) {
      return reply.status(409).send({
        message: "Short URL já existe",
      });
    }

    // 3. Inserir no banco
    const [link] = await db
      .insert(links)
      .values({
        originalUrl,
        shortUrl,
      })
      .returning();

    // 4. Retornar resposta
    return reply.status(201).send(link);
  });
}
