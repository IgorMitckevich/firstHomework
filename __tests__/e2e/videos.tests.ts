import request from "supertest";
import { describe } from "node:test";
import express from "express";
import { setupApp } from "../../src/setup-app";
import { HttpStatus } from "../../src/core/types/http-statuses";

describe("./Videos tests", () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app)
      .delete("/api/testing/all-data")
      .expect(HttpStatus.NoContent);
  });

  it("should be work", async () => {
    await request(app).post("/api/videos").expect(HttpStatus.NoContent);
  });

  it("should be work", async () => {
    await request(app).get("/api/videos").expect(HttpStatus.Ok);
  });

  it("should be work", async () => {
    await request(app).get("/api/videos/:id").expect(HttpStatus.Ok);
  });
  it("should be work", async () => {
    await request(app).put("/api/videos/:id").expect(HttpStatus.Ok);
  });
  it("should be work", async () => {
    await request(app).delete("/api/videos/:id").expect(HttpStatus.NoContent);
  });
});
