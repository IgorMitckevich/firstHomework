import express, { Request, Response, Router } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { dbVideos } from "../db/dbVideos";
import {CreateVideoInputModel, Video} from "../core/types/TypesVideo";
import {
  validationPut,
  validationPost,
} from "../core/validation/validationValues";
import {APIErrorResult} from "../core/types/TypesErrors";

export const videosRouter: Router = express.Router();

videosRouter
  .get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(dbVideos);
  })
  .get("/:id", (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
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
      canBeDownLoad: false,
      minAgeRestriction: null,
      publicationDate:  defaultPublicationDate(),
      availableResolutions:req.body.availableResolutions
    }

    dbVideos.push(createNewVideo);
    res.status(HttpStatus.Created).send(dbVideos[dbVideos.length-1]);
  })
  .put("/:id", (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    if(isNaN(id)) {
      res.status(HttpStatus.NotFound).send("No video ID found");
      return;
    }
    const VideoIndex: number = dbVideos.findIndex((v) => v.id === id);
    if (VideoIndex=== -1) {
      res.status(HttpStatus.NotFound);
      return;
    }

        const errors: APIErrorResult = validationPut(req.body);
    if (errors.errorsMessages.length > 0) {
      res.status(HttpStatus.BadRequest).send(errors);
      return;
    }
    // const defaultPublicationDate=():string=> {
    //   const date = new Date();
    //   date.setDate(date.getDate() + 1);
    //   return date.toISOString()
    // }
    dbVideos[VideoIndex]={
      ...dbVideos[VideoIndex],
      title: req.body.title,
      author: req.body.author,
     canBeDownLoad: req.body.canBeDownLoad,
      minAgeRestriction: req.body.minAgeRestriction??null,
      publicationDate: req.body.publicationDate,
     availableResolutions:req.body.availableResolutions
    }


    res.status(HttpStatus.NoContent);
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
