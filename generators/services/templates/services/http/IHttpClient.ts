import { HttpMethod } from "./HttpMethod";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpClient {
  request: <T, R>(
    url: string,
    method: HttpMethod,
    params: T
  ) => Promise<IHttpResponse<R>>;
}
