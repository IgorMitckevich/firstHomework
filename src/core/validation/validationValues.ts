import { Video } from "../types/TypesVideo";
import { APIErrorResult, FieldError } from "../types/TypesErrors";
import { HttpStatus } from "../types/http-statuses";
import { errorsMessages } from "../ErrorMessages";

export const validationCheck = (Video: Video): FieldError[] => {
  const errors: FieldError[] = [];
  if (
    !Video.title ||
    !Video.author ||
    !Video.availableResolutions ||
    !Video.canBeDownLoad ||
    !Video.minAgeRestriction ||
    !Video.publicationDate
  ) {
    errors.push({ field: "any", message: "Invalid values" });
  }
  if (
    Video.minAgeRestriction === null ||
    Video.minAgeRestriction > 18 ||
    Video.minAgeRestriction < 1
  ) {
    Video.minAgeRestriction = null;
  }

  if (!Video.publicationDate) {
    const defaultDate = new Date(Video.createdAt);
    defaultDate.setDate(defaultDate.getDate() + 1);
    Video.publicationDate = defaultDate.toISOString();
  }

  if (Video.canBeDownLoad === undefined || Video.canBeDownLoad === null) {
    Video.canBeDownLoad = false;
  }

  return errors;
};

export const validationValues = (Video: Video): FieldError[] => {
  const errors: FieldError[] = [];
  //надо ли этот if?
  if (
    !Video.title ||
    !Video.author ||
    !Video.availableResolutions ||
    !Video.canBeDownLoad ||
    !Video.minAgeRestriction ||
    !Video.publicationDate
  ) {
    errors.push({ field: "any", message: "Invalid values" });
  }

  if (Video.title.length > 40) {
    errors.push({ field: "title", message: "title is longer than 40 symbols" });
  }

  if (Video.author.length > 20) {
    errors.push({
      field: "author",
      message: "author is longer than 20 symbols",
    });
  }
  if (Video.availableResolutions.length === 0) {
    errors.push({
      field: "availableResolutions",
      message: "At least one resolution should be added",
    });
  }

  if (Video.minAgeRestriction === null) {
  } else if (Video.minAgeRestriction > 18 || Video.minAgeRestriction < 1) {
    errors.push({
      field: "minAgeRestriction",
      message: "Age restrictions range from 1 to 18",
    });
  }

  return errors;
};
