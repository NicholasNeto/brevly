import { config } from "dotenv";
import { vi } from "vitest";


config({
  path: ".env.test",
});


vi.mock("../lib/db");
vi.mock("../lib/upload-file-to-storage");
vi.mock("../utils/generate-links-csv");