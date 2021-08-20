import { CriticalError } from "./CriticalError";
import { UnauthorizedError } from "./UnauthorizedError";
import { ValidationError } from "./ValidationError";

export type TUsecaseError =
  | Error
  | UnauthorizedError
  | CriticalError
  | ValidationError;
