import express, { Request, Response, Router } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { dbVideos } from "../db/dbVideos";
import {
  CreateVideoInputModel,
  Resolutions, UpdateVideoInputModel,
  Video,
} from "../core/types/TypesVideo";
import {
  validationPut,
  validationPost,
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

    const errors: APIErrorResult= validationPost(req.body);
    if (errors.errorsMessages.length > 0) {
      res.status(HttpStatus.BadRequest).send(errors);
      return;
    }
    const defaultPublicationDate=():string=> {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString()
    }
    const createNewVideo: Video = {
      id:dbVideos.length ? dbVideos[dbVideos.length-1].id+1:1,
      title: req.body.title,
      author: req.body.author,
      createdAt: new Date().toISOString(),
      canBeDownLoad: req.body.canBeDownLoad?? false,
      minAgeRestriction: req.body.minAgeRestriction??null,
      publicationDate: new Date().toISOString() || defaultPublicationDate(),
      availableResolutions:req.body.availableResolutions
    }
    if (!createNewVideo) {
      res.status(HttpStatus.BadRequest);
      return;
    }


    dbVideos.push(createNewVideo);
    res.status(HttpStatus.Created).send(createNewVideo)
  })
  .put("/:id", (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    if(isNaN(id)) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }
    const VideoId: Video|undefined = dbVideos.find((v) => v.id === id);
    if (!VideoId) {
      res.status(HttpStatus.BadRequest);
      return;
    }

        const errors: APIErrorResult = validationPut(req.body);
    if (errors.errorsMessages.length > 0) {
      res.status(HttpStatus.BadRequest).send(errors);
      return;
    }
    const defaultPublicationDate=():string=> {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString()
    }
    const newValueVideo:Video={
      ...VideoId,
      title: req.body.title,
      author: req.body.author,
     canBeDownLoad: req.body.canBeDownLoad?? VideoId.canBeDownLoad,
      minAgeRestriction: req.body.minAgeRestriction??null,
      publicationDate: req.body.publicationDate ||defaultPublicationDate(),
     availableResolutions:req.body.availableResolutions
    }
    const VideoIndex: number = dbVideos.findIndex((v) => v.id === id);
    dbVideos[VideoIndex]=newValueVideo;


    res.sendStatus(HttpStatus.NoContent);
  })
  .delete("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const VideoIndex: number = dbVideos.findIndex((v) => v.id === id);
    if (VideoIndex===-1) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }
    dbVideos.splice(VideoIndex, 1);
    res.sendStatus(HttpStatus.NoContent);
  });
