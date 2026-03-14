import { APIErrorResult, FieldError } from "./types/TypesErrors";

export const errorsMessages = (errors: FieldError[]): APIErrorResult => {
  return { errorsMessages: errors };
};
