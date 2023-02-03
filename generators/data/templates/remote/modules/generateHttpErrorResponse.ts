import {
  CriticalError,
  ForbiddenError,
  NotFoundError,
  TApplicationError,
  UnauthorizedError,
  NotAcceptableError,
  ValidationError,
} from "@/js/core/Errors";
import { AxiosError } from "axios";

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
      return new ValidationError(
        Object.entries(data.errors).map((err) => {
          const parameter = fieldMap
            ? formatProperty(err[0], fieldMap)
            : err[0];

          return {
            parameter,
            error: err[1],
          };
        })
      );
    }
  }

  return new CriticalError(error);
}
