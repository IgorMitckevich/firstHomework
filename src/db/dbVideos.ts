import { Resolutions, Video } from "../core/types/TypesVideo";

export let dbVideos: Video[] = [
  {
    id: 1,
    title: "Котики для релаксации",
    author: "Relax Channel",
    canBeDownLoad: true,
    minAgeRestriction: 14,
    createdAt: "2024-01-15T10:30:00Z",
    publicationDate: "2024-01-20T08:00:00Z",
    availableResolutions: [Resolutions.P144, Resolutions.P240, Resolutions.P360, Resolutions.P720]
  },
  {
    id: 2,
    title: "Уроки игры на гитаре",
    author: "Music School",
    canBeDownLoad: true,
    minAgeRestriction: null,
    createdAt: "2024-02-10T14:20:00Z",
    publicationDate: "2024-02-15T09:00:00Z",
    availableResolutions: [Resolutions.P360, Resolutions.P480, Resolutions.P720, Resolutions.P1080]
  },{
    id: 3,
    title: "Экстремальный спорт: дайджест",
    author: "Extreme Sports",
    canBeDownLoad: false,
    minAgeRestriction: 16,
    createdAt: "2024-03-05T11:45:00Z",
    publicationDate: "2024-03-10T16:30:00Z",
    availableResolutions: [Resolutions.P720, Resolutions.P1080, Resolutions.P1440, Resolutions.P2160]
  },
  {
    id: 4,
    title: "Кулинарный мастер-класс",
    author: "Tasty Food",
    canBeDownLoad: true,
    minAgeRestriction: 15,
    createdAt: "2024-04-12T09:15:00Z",
    publicationDate: "2024-04-18T12:00:00Z",
    availableResolutions: [Resolutions.P360, Resolutions.P480, Resolutions.P720]
  },
  {
    id: 5,
    title: "Документальный фильм: Космос",
    author: "Discovery Channel",
    canBeDownLoad: true,
    minAgeRestriction: 12,
    createdAt: "2024-05-20T13:30:00Z",
    publicationDate: "2024-05-25T20:00:00Z",
    availableResolutions: [Resolutions.P720, Resolutions.P1080, Resolutions.P1440, Resolutions.P2160]
  }
];
