import cookies from "js-cookie";
import axios, { InternalAxiosRequestConfig } from "axios";
import { IHttpClient, IHttpResponse, IHttpClientRequestParams } from "@/services/http";
import { createQueryString } from "@/utils/queryString";

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_COOKIE_NAME } = process.env;

const client = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    serialize: createQueryString,
  },
  timeout: 7200000,
});

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | undefined = cookies.get(
      NEXT_PUBLIC_COOKIE_NAME as string
    );
    if (token != null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  }
);

function sanitizeParams<Params>(params: Params): Record<string, string> | undefined {
  return !!params && typeof params == "object" 
    ? Object.fromEntries(
        Object.entries(params).filter(([_, v]) => {
          if (typeof v === "string") return v.length > 0;

          return true;
        })
      )
    : undefined;
}

export class HttpClientAxios implements IHttpClient {
  async request<Response, Payload = undefined, Params = undefined>({
    url,
    method,
    params,
    payload,
    baseURL,
  }: IHttpClientRequestParams<Payload, Params>): Promise<
    IHttpResponse<Response>
  > {
    const sanitizedParams = sanitizeParams<Params>(params);

    const response = await client.request({
      url,
      method,
      params: sanitizedParams,
      data: payload,
      baseURL
    });

    return await Promise.resolve({
      statusCode: response.status,
      body: response.data,
    });
  }
}
