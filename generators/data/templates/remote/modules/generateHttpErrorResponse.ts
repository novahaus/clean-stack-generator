import {
  CriticalError,
  ForbiddenError,
  NotFoundError,
  TApplicationError,
  UnauthorizedError,
  NotAcceptableError,
  ValidationError,
  IValidationError,
} from "@/core/Errors";
import { AxiosError } from "axios";
import { HttpStatusCode } from "@/services/http/HttpStatusCode";

interface FieldMap {
  [key: string]: string;
}

interface HttpResponseError {
  message: string;
  statusCode: number;
  errors?: {
    [key: string]: string;
  };
}

function formatProperty(property: string, fieldMap: FieldMap): string {
  const splittedProperty = property.split(".");

  if (splittedProperty.length < 2) return fieldMap[splittedProperty[0]];

  return `${fieldMap[splittedProperty[0]]}.${splittedProperty[1]}.${
    fieldMap[splittedProperty[2]]
  }`;
}

function formatValidationError(
  errors: Record<string, string>,
  fieldMap?: FieldMap
): IValidationError[] {
  return Object.entries(errors).map((err) => {
    const parameter = fieldMap ? formatProperty(err[0], fieldMap) : err[0];

    return {
      parameter,
      error: err[1],
    };
  });
}

export function generateHttpErrorResponse(
  error: AxiosError<HttpResponseError>,
  fieldMap?: FieldMap
): TApplicationError {
  if (error?.response != null) {
    const {
      response: { status, data },
    } = error;

    const responseError = new Error(data ? data.message : error.message);

    if (status === HttpStatusCode.UNAUTHORIZED) {
      return new UnauthorizedError(responseError);
    }

    if (status === HttpStatusCode.FORBIDDEN) {
      return new ForbiddenError(responseError);
    }

    if (status === HttpStatusCode.NOT_FOUND) {
      return new NotFoundError(responseError);
    }

    if (status === HttpStatusCode.NOT_ACCEPTABLE) {
      return new NotAcceptableError(responseError);
    }

    if (
      status === HttpStatusCode.UNPROCESSABLE_ENTITY &&
      data.errors !== undefined
    ) {
      const formattedErrors = formatValidationError(data.errors, fieldMap);

      return new ValidationError(formattedErrors);
    }
  }

  return new CriticalError(error);
}
