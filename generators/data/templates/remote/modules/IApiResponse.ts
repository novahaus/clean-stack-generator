import { HttpStatusCode } from "@/services/http";

export interface IApiResponse {
  statusCode: HttpStatusCode;
  data: Body;
}