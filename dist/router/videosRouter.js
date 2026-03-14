"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_statuses_1 = require("../core/types/http-statuses");
const dbVideos_1 = require("../db/dbVideos");
const ErrorMessages_1 = require("../core/ErrorMessages");
const validationValues_1 = require("../core/validation/validationValues");
exports.videosRouter = express_1.default.Router();
exports.videosRouter
    .get("/", (req, res) => {
    res.status(http_statuses_1.HttpStatus.Ok).send(dbVideos_1.dbVideos);
})
    .get("/:id", (req, res) => {
    const id = +req.params.id;
    const VideoId = dbVideos_1.dbVideos.find((v) => v.id === id);
    if (!VideoId) {
        res.status(http_statuses_1.HttpStatus.NotFound).send("No video ID found");
        return;
    }
    res.status(http_statuses_1.HttpStatus.Ok).send(VideoId);
})
    .post("/", (req, res) => {
    const createNewVideo = req.body;
    if (!createNewVideo) {
        res.status(http_statuses_1.HttpStatus.BadRequest);
        return;
    }
    // @ts-ignore
    const errors = (0, validationValues_1.validationValues)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, ErrorMessages_1.errorsMessages)(errors));
        return;
    }
    dbVideos_1.dbVideos.push(req.body);
    res.status(http_statuses_1.HttpStatus.NoContent);
})
    .put("/:id", (req, res) => {
    const id = +req.params.id;
    const VideoId = dbVideos_1.dbVideos.findIndex((v) => v.id === id);
    if (!VideoId) {
        res.status(http_statuses_1.HttpStatus.NotFound).send("No video ID found");
        return;
    }
    const errors = (0, validationValues_1.validationCheck)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, ErrorMessages_1.errorsMessages)(errors));
        return;
    }
    dbVideos_1.dbVideos[VideoId] = (req.body);
    res.status(http_statuses_1.HttpStatus.Ok);
})
    .delete("/:id", (req, res) => {
    const id = +req.params.id;
    const VideoIndex = dbVideos_1.dbVideos.findIndex((v) => v.id === id);
    if (!VideoIndex) {
        res.status(http_statuses_1.HttpStatus.NotFound).send("No video ID found");
        return;
    }
    dbVideos_1.dbVideos.splice(VideoIndex, 1);
    res.status(http_statuses_1.HttpStatus.NoContent);
});
