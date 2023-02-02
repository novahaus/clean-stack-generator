import { HttpMethod } from "./HttpMethod";

export interface IHttpClientRequestParams<Payload = undefined, Params = undefined> {
  url: string;
  method: HttpMethod;
  params?: Params;
  payload?: Payload;
  baseURL?: string;
}
