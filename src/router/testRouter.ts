import express, { Request, Response, Router } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { dbVideos } from "../db/dbVideos";


export const testsRouter: Router = express.Router();

testsRouter
    .delete("/", (req: Request, res: Response) => {
        dbVideos.length = 0;
        res.status(HttpStatus.NoContent).send("all videos deleted");
    });
