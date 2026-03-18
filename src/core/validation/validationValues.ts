import {CreateVideoInputModel, Resolutions, UpdateVideoInputModel} from "../types/TypesVideo";
import { APIErrorResult, FieldError } from "../types/TypesErrors";


export const validationPut = (video: UpdateVideoInputModel): APIErrorResult => {
  const errors: FieldError[] = [];
  if (!video.title || video.title.trim() === '') {
    errors.push({field: "title", message: "Invalid title"});
  }else if( video.title.length > 40){
    errors.push({field: "title", message: "Title should not exceed 40 characters"});
  }

  if (!video.author || video.author.trim() === '') {
    errors.push({field: "author", message: "Invalid author"});
  }else if (video.author.length > 20){
    errors.push({field: "author", message: "Author should not exceed 20 characters"});
  }

  if (video.minAgeRestriction !== null) {
    if (
        video.minAgeRestriction > 18 ||
        video.minAgeRestriction < 1 || video.minAgeRestriction === undefined
    ) {
      errors.push({field: "age", message: "incorrect age"})
    }
  }
  if (!video.canBeDownloaded) {
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
  }else {
    const allowedResolutions = Object.values(Resolutions);
    video.availableResolutions.forEach((res) => {
      if (!allowedResolutions.includes(res)) {
        errors.push({
          field: "availableResolutions",
          message: `Invalid resolution: ${res}. Allowed values: ${allowedResolutions.join(', ')}`
        });
      }
    });
  }


  return {errorsMessages: errors};
}


  export const validationPost = (video: CreateVideoInputModel): APIErrorResult => {
    const errors: FieldError[] = [];

    if (!video.title || video.title.trim() === '' || video.title.length ===null) {
      errors.push({field: "title", message: "Invalid title"});
    } else if (video.title.length > 40) {
      errors.push({field: "title", message: "Title should not exceed 40 characters"});
    }

    if (!video.author || video.author.trim() === '') {
      errors.push({field: "author", message: "Author is required"});
    } else if (video.author.length > 20) {
      errors.push({field: "author", message: "Author should not exceed 20 characters"});
    }

      if (video.availableResolutions.length === 0) {
        errors.push({
          field: "availableResolutions",
          message: "At least one resolution should be added",
        });
      }else {
        const allowedResolutions = Object.values(Resolutions);
        video.availableResolutions.forEach((res) => {
           if (!allowedResolutions.includes(res)) {
          errors.push({field: "availableResolutions", message: `Invalid resolution: ${res}. Allowed values: ${allowedResolutions.join(', ')}`
            });
          }
        });
} return {errorsMessages: errors};
}
