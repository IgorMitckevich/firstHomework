"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPost = exports.validationPut = void 0;
const validationPut = (video) => {
    const errors = [];
    if (!video.title) {
        errors.push({ field: "title", message: "Invalid title" });
    }
    if (video.title.length > 40) {
        errors.push({ field: "title", message: "Title length is too long" });
    }
    if (!video.author) {
        errors.push({ field: "author", message: "Invalid author" });
    }
    if (video.author.length > 20) {
        errors.push({ field: "author", message: "Author length is too long" });
    }
    if (video.minAgeRestriction !== null) {
        if (video.minAgeRestriction > 18 ||
            video.minAgeRestriction < 1) {
            errors.push({ field: "age", message: "incorrect age" });
        }
    }
    return { errorsMessages: [errors[errors.length - 1]] };
};
exports.validationPut = validationPut;
const validationPost = (video) => {
    const errors = [];
    if (!video.title) {
        errors.push({ field: "title", message: "Invalid title" });
    }
    if (video.title.length > 40) {
        errors.push({ field: "title", message: "Title length is too long" });
    }
    if (!video.author) {
        errors.push({ field: "author", message: "Invalid author" });
    }
    if (video.author.length > 20) {
        errors.push({ field: "author", message: "Author length is too long" });
    }
    if (video.availableResolutions.length === 0) {
        errors.push({
            field: "availableResolutions",
            message: "At least one resolution should be added",
        });
    }
    return { errorsMessages: [errors[errors.length - 1]] };
};
exports.validationPost = validationPost;
