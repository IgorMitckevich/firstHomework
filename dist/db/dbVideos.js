"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbVideos = void 0;
const TypesVideo_1 = require("../core/types/TypesVideo");
exports.dbVideos = [
    {
        id: 1,
        title: "cats-meme",
        author: "igor",
        canBeDownLoad: true,
        minAgeRestriction: 15,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(), // need rework
        availableResolutions: [
            TypesVideo_1.Resolutions.P144,
            TypesVideo_1.Resolutions.P240,
            TypesVideo_1.Resolutions.P360,
        ]
    },
    {
        id: 2,
        title: "tricks",
        author: "Vlad",
        canBeDownLoad: false,
        minAgeRestriction: 17,
        createdAt: new Date().toISOString(),
        publicationDate: String(new Date()), // need rework
        availableResolutions: [
            TypesVideo_1.Resolutions.P144,
            TypesVideo_1.Resolutions.P240,
            TypesVideo_1.Resolutions.P360,
            TypesVideo_1.Resolutions.P480,
            TypesVideo_1.Resolutions.P720,
            TypesVideo_1.Resolutions.P1080,
            TypesVideo_1.Resolutions.P1440,
            TypesVideo_1.Resolutions.P2160,
        ]
    },
];
