import { IHttpClientRequestParams } from "./IHttpClientRequestParams";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpClient {
  request: <Response, Payload = undefined, Params = undefined>({
    url,
    method,
    params,
    payload,
    baseURL,
  }: IHttpClientRequestParams<Payload, Params>) => Promise<IHttpResponse<Response>>;
}
