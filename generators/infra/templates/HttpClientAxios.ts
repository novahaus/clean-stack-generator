import cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient, HttpMethod, IHttpResponse } from "@/services/http";
import { createQueryString } from "@/utils/queryString";

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_COOKIE_NAME } = process.env

const client = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  paramsSerializer: createQueryString,
  timeout: 7200000,
})

client.interceptors.request.use((config: AxiosRequestConfig) => {
  const token: string | undefined = cookies.get(NEXT_PUBLIC_COOKIE_NAME as string);
  if (token != null) config.headers.Authorization = `Bearer ${token}`;

  return config;
})

export class HttpClientAxios implements IHttpClient {
  async request<T, R>(
    url: string,
    method: HttpMethod,
    params: T
  ): Promise<IHttpResponse<R>> {
    const response = await client({ url, method, params });

    return await Promise.resolve({
      statusCode: response.status,
      body: response.data,
    });
  }
}
