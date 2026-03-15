import express, { Request, Response, Router, Express } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { Video } from "./core/types/TypesVideo";
import { videosRouter } from "./router/videosRouter";
import {testsRouter} from "./router/testRouter";

export const setupApp = (app: Express) => {
  app.use(express.json());


  app.use("/videos", videosRouter);
  app.use("/testing/all-data", testsRouter);
  return app;
};
