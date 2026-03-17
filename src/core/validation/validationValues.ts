import {CreateVideoInputModel, UpdateVideoInputModel} from "../types/TypesVideo";
import { APIErrorResult, FieldError } from "../types/TypesErrors";


export const validationPut = (video: UpdateVideoInputModel): APIErrorResult => {
  const errors: FieldError[] = [];
  if (!video.title || video.title.length > 40) {
    errors.push({field: "title", message: "Invalid title"});
  }

  if (!video.author || video.author.length > 20) {
    errors.push({field: "author", message: "Invalid author"});
  }

  if (video.minAgeRestriction !== null) {
    if (
        video.minAgeRestriction > 18 ||
        video.minAgeRestriction < 1 || video.minAgeRestriction === undefined
    ) {
      errors.push({field: "age", message: "incorrect age"})
    }
  }
  if (!video.canBeDownLoad) {
    errors.push({field: "canBeDownLoad", message: "undefined"});
  }
  if (!video.publicationDate) {
    errors.push({field: "publicationDate", message: "incorrect publicationDate"});
  }
  if (video.availableResolutions.length === 0) {
    errors.push({
      field: "availableResolutions",
      message: "At least one resolution should be added",
    });
  }
  return {errorsMessages: errors};
}


  export const validationPost = (video: CreateVideoInputModel): APIErrorResult => {
    const errors: FieldError[] = [];

    if (
        !video.title || video.title.length > 40
    ) {
      errors.push({field: "title", message: "Invalid title"});
    }

    if (!video.author || video.author.length > 20) {
      errors.push({field: "author", message: "Invalid author"});
    }

    if (video.availableResolutions.length === 0) {
      errors.push({
        field: "availableResolutions",
        message: "At least one resolution should be added",
      });
    }
    return {errorsMessages: errors};
  }
