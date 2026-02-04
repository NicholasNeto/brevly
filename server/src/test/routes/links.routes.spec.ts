import Fastify, { FastifyInstance } from "fastify";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { linksRoutes } from "../../routes/links";
import { db } from "../../db";

describe("Links Routes", () => {
    let app: FastifyInstance;
  
    beforeEach(async () => {
      app = Fastify();
      await app.register(linksRoutes);
      await app.ready();
    });
  
    afterEach(async () => {
      await app.close();
      vi.clearAllMocks();
    });
  
    // =====================
    // POST /links
    // =====================
  
    it("deve criar um link com sucesso", async () => {
      vi.spyOn(db, "select").mockReturnValueOnce({
        from: () => ({
          where: () => ({
            limit: async () => [],
          }),
        }),
      } as any);
  
      vi.spyOn(db, "insert").mockReturnValueOnce({
        values: () => ({
          returning: async () => [
            {
              id: "1",
              originalUrl: "https://google.com",
              shortUrl: "ggl",
            },
          ],
        }),
      } as any);
  
      const response = await app.inject({
        method: "POST",
        url: "/links",
        payload: {
          originalUrl: "https://google.com",
          shortUrl: "ggl",
        },
      });
  
      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        originalUrl: "https://google.com",
        shortUrl: "ggl",
      });
    });
  
    it("deve retornar 409 se shortUrl já existir", async () => {
      vi.spyOn(db, "select").mockReturnValueOnce({
        from: () => ({
          where: () => ({
            limit: async () => [{ id: "1" }],
          }),
        }),
      } as any);
  
      const response = await app.inject({
        method: "POST",
        url: "/links",
        payload: {
          originalUrl: "https://google.com",
          shortUrl: "ggl",
        },
      });
  
      expect(response.statusCode).toBe(409);
      expect(response.json()).toEqual({
        message: "Short URL já existe",
      });
    });
  
    // =====================
    // GET /links
    // =====================
  
    it("deve listar todos os links", async () => {
      vi.spyOn(db, "select").mockReturnValueOnce({
        from: () => ({
          orderBy: async () => [
            { id: "1", shortUrl: "a" },
            { id: "2", shortUrl: "b" },
          ],
        }),
      } as any);
  
      const response = await app.inject({
        method: "GET",
        url: "/links",
      });
  
      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveLength(2);
    });
  
    // =====================
    // DELETE /links/:id
    // =====================
  
    it("deve deletar um link existente", async () => {
      vi.spyOn(db, "delete").mockReturnValueOnce({
        where: () => ({
          returning: async () => [{ id: "1" }],
        }),
      } as any);
  
      const response = await app.inject({
        method: "DELETE",
        url: "/links/550e8400-e29b-41d4-a716-446655440000",
      });
  
      expect(response.statusCode).toBe(204);
    });
  
    it("deve retornar 404 ao deletar link inexistente", async () => {
      vi.spyOn(db, "delete").mockReturnValueOnce({
        where: () => ({
          returning: async () => [],
        }),
      } as any);
  
      const response = await app.inject({
        method: "DELETE",
        url: "/links/550e8400-e29b-41d4-a716-446655440000",
      });
  
      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({
        message: "Link não encontrado",
      });
    });
  
    // =====================
    // GET /:shortUrl
    // =====================
  
    it("deve redirecionar e incrementar acessos", async () => {
      vi.spyOn(db, "select").mockReturnValueOnce({
        from: () => ({
          where: () => ({
            limit: async () => [
              {
                id: "1",
                shortUrl: "ggl",
                originalUrl: "https://google.com",
              },
            ],
          }),
        }),
      } as any);
  
      vi.spyOn(db, "update").mockReturnValueOnce({
        set: () => ({
          where: async () => {},
        }),
      } as any);
  
      const response = await app.inject({
        method: "GET",
        url: "/ggl",
      });
  
      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe("https://google.com");
    });
  
    it("deve retornar 404 se shortUrl não existir", async () => {
      vi.spyOn(db, "select").mockReturnValueOnce({
        from: () => ({
          where: () => ({
            limit: async () => [],
          }),
        }),
      } as any);
  
      const response = await app.inject({
        method: "GET",
        url: "/naoexiste",
      });
  
      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({
        message: "Link não encontrado",
      });
    });
  });