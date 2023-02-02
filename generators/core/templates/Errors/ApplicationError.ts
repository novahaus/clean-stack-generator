import { UnauthorizedError } from "./UnauthorizedError";
import { CriticalError } from "./CriticalError";
import { ValidationError } from "./ValidationError";

export type TApplicationError =
  | Error
  | UnauthorizedError
  | CriticalError
  | ValidationError;
