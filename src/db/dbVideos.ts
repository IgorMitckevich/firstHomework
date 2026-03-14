import { Resolutions, Video } from "../core/types/TypesVideo";

export const dbVideos: Video[] = [
  {
    id: 1,
    title: "cats-meme",
    author: "igor",
    canBeDownLoad: true,
    minAgeRestriction: 15,
    createdAt: new Date().toISOString(),
    publicationDate: String(new Date()), // need rework
    availableResolutions: [
      Resolutions.P144,
      Resolutions.P240,
      Resolutions.P360,
    ],
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
      Resolutions.P144,
      Resolutions.P240,
      Resolutions.P360,
      Resolutions.P480,
      Resolutions.P720,
      Resolutions.P1080,
      Resolutions.P1440,
      Resolutions.P2160,
    ],
  },
];
