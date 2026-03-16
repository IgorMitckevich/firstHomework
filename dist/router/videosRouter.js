"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_statuses_1 = require("../core/types/http-statuses");
const dbVideos_1 = require("../db/dbVideos");
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
    var _a, _b;
    const errors = (0, validationValues_1.validationPost)(req.body);
    if (errors.errorsMessages.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send(errors);
        return;
    }
    const defaultPublicationDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString();
    };
    const createNewVideo = {
        id: dbVideos_1.dbVideos.length ? dbVideos_1.dbVideos[dbVideos_1.dbVideos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        createdAt: new Date().toISOString(),
        canBeDownLoad: (_a = req.body.canBeDownLoad) !== null && _a !== void 0 ? _a : false,
        minAgeRestriction: (_b = req.body.minAgeRestriction) !== null && _b !== void 0 ? _b : null,
        publicationDate: new Date().toISOString() || defaultPublicationDate(),
        availableResolutions: req.body.availableResolutions
    };
    if (!createNewVideo) {
        res.status(http_statuses_1.HttpStatus.BadRequest);
        return;
    }
    dbVideos_1.dbVideos.push(createNewVideo);
    res.sendStatus(http_statuses_1.HttpStatus.Created);
})
    .put("/:id", (req, res) => {
    var _a, _b;
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(http_statuses_1.HttpStatus.NotFound).send("No video ID found");
        return;
    }
    const VideoId = dbVideos_1.dbVideos.find((v) => v.id === id);
    if (!VideoId) {
        res.status(http_statuses_1.HttpStatus.BadRequest);
        return;
    }
    const errors = (0, validationValues_1.validationPut)(req.body);
    if (errors.errorsMessages.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send(errors);
        return;
    }
    const defaultPublicationDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString();
    };
    const newValueVideo = Object.assign(Object.assign({}, VideoId), { title: req.body.title, author: req.body.author, canBeDownLoad: (_a = req.body.canBeDownLoad) !== null && _a !== void 0 ? _a : VideoId.canBeDownLoad, minAgeRestriction: (_b = req.body.minAgeRestriction) !== null && _b !== void 0 ? _b : null, publicationDate: req.body.publicationDate || defaultPublicationDate(), availableResolutions: req.body.availableResolutions });
    const VideoIndex = dbVideos_1.dbVideos.findIndex((v) => v.id === id);
    dbVideos_1.dbVideos[VideoIndex] = newValueVideo;
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
})
    .delete("/:id", (req, res) => {
    const id = +req.params.id;
    const VideoIndex = dbVideos_1.dbVideos.findIndex((v) => v.id === id);
    if (VideoIndex === -1) {
        res.status(http_statuses_1.HttpStatus.NotFound).send("No video ID found");
        return;
    }
    dbVideos_1.dbVideos.splice(VideoIndex, 1);
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
