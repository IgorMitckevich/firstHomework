"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videosRouter_1 = require("./router/videosRouter");
const testRouter_1 = require("./router/testRouter");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use("/videos", videosRouter_1.videosRouter);
    app.use("/testing/all-data", testRouter_1.testsRouter);
    return app;
};
exports.setupApp = setupApp;
