import express, { Request, Response, Router, Express } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { Video } from "./core/types/TypesVideo";
import { videosRouter } from "./router/videosRouter";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.use("/videos", videosRouter);

  return app;
};
