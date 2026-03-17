import express, { Express } from "express";

import { videosRouter } from "./router/videosRouter";
import {testsRouter} from "./router/testRouter";

export const setupApp = (app: Express) => {
  app.use(express.json());


  app.use("/videos", videosRouter);
  app.use("/testing/all-data", testsRouter);
  return app;
};
