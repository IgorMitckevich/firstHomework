"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_statuses_1 = require("../core/types/http-statuses");
const dbVideos_1 = require("../db/dbVideos");
exports.testsRouter = express_1.default.Router();
exports.testsRouter
    .delete("/", (req, res) => {
    dbVideos_1.dbVideos.length = 0;
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
