import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { links } from "../db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { generateLinksCsv } from "../utils/genereteLinksCsv";
import { Readable } from "node:stream"
import { uploadFileToStorage } from "../infra/storage/upload-file-to-storage";

export async function linksRoutes(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
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

    const [link] = await db
      .insert(links)
      .values({
        originalUrl,
        shortUrl,
      })
      .returning();

    return reply.status(201).send(link);
  });

  app.get("/links", async () => {
    const allLinks = await db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt));

    return allLinks;
  });

  // 🗑️ DELETE /links/:id
  app.delete("/links/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const deleted = await db.delete(links).where(eq(links.id, id)).returning();

    if (deleted.length === 0) {
      return reply.status(404).send({
        message: "Link não encontrado",
      });
    }

    return reply.status(204).send();
  });

  // =====================
  // GET /:shortUrl
  // =====================

  app.get("/:shortUrl", async (request, reply) => {
    const paramsSchema = z.object({
      shortUrl: z.string(),
    });

    const { shortUrl } = paramsSchema.parse(request.params);

    const result = await db
      .select()
      .from(links)
      .where(eq(links.shortUrl, shortUrl))
      .limit(1);

    if (result.length === 0) {
      return reply.status(404).send({
        message: "Link não encontrado",
      });
    }

    const link = result[0];

    // Incrementa acessos
    await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
      })
      .where(eq(links.id, link.id));

    // Redireciona
    return reply.redirect(link.originalUrl);
  });


  app.get("/links/download", async (request, reply) => {
    const allLinks = await db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt))

    const csv = generateLinksCsv(allLinks)
  
    const csvStream = Readable.from(csv)
  
    const file = await uploadFileToStorage({
      folder: "downloads-links",
      fileName: "links.csv",
      contentType: "text/csv",
      contentStream: csvStream,
    })
  
    return reply.send({
      url: file.url,
    })
  })
  
}
