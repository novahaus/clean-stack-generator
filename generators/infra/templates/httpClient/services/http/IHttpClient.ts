import { HttpMethod } from "./HttpMethod";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpClient {
  request: <Response, Payload = undefined, Params = undefined>({
    url,
    method,
    params,
    payload,
    baseURL,
  }: {
    url: string;
    method: HttpMethod;
    params?: Params;
    payload?: Payload;
    baseURL?: string;
  }) => Promise<IHttpResponse<Response>>;
}
