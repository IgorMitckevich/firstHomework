import express, { Request, Response, Router } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { dbVideos } from "../db/dbVideos";
import {
  CreateVideoInputModel,
  Resolutions,
  Video,
} from "../core/types/TypesVideo";
import { errorsMessages } from "../core/ErrorMessages";
import {
  validationCheck,
  validationValues,
} from "../core/validation/validationValues";
import { APIErrorResult, FieldError } from "../core/types/TypesErrors";

export const videosRouter: Router = express.Router();

videosRouter
  .get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(dbVideos);
  })
  .get("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const VideoId: Video | undefined = dbVideos.find((v) => v.id === id);
    if (!VideoId) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }

    res.status(HttpStatus.Ok).send(VideoId);
  })
  .post("/", (req: Request, res: Response) => {
    const createNewVideo: CreateVideoInputModel = req.body;

    if (!createNewVideo) {
      res.status(HttpStatus.BadRequest);
      return;
    }
    // @ts-ignore
    const errors: FieldError[] = validationValues(req.body);
    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(errorsMessages(errors));
      return;
    }
  })
  .put("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const VideoId: Video | undefined = dbVideos.find((v) => v.id === id);
    if (!VideoId) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }

    const errors: FieldError[] = validationCheck(req.body);
    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(errorsMessages(errors));
      return;
    }
  })
  .delete("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const VideoIndex: number = dbVideos.findIndex((v) => v.id === id);
    if (!VideoIndex) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }
    dbVideos.splice(VideoIndex, 1);
    res.status(HttpStatus.NoContent);
  });
