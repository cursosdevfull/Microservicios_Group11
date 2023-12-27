import { RequestResult } from "../../infrastructure/api.infrastructure";

export interface ApiRepository {
  requestByType(
    url: string,
    method: string,
    data?: any
  ): Promise<RequestResult>;
}
