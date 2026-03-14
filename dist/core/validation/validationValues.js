"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationValues = exports.validationCheck = void 0;
const validationCheck = (Video) => {
  const errors = [];
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
exports.validationCheck = validationCheck;
const validationValues = (Video) => {
  const errors = [];
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
exports.validationValues = validationValues;
