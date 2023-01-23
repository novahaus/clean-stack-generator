import { HttpStatusCode } from "./HttpStatusCode";

export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}
