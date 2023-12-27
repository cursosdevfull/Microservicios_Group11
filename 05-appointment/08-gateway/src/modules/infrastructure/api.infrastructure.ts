import axios, { AxiosRequestConfig } from "axios";
import { err, ok, Result } from "neverthrow";

import { ApiRepository } from "../domain/repositories/api.repository";

export type RequestResult = Result<any, Error>;

export class ApiInfrastructure implements ApiRepository {
  async requestByType(
    url: string,
    method: string,
    data?: any
  ): Promise<RequestResult> {
    const request: AxiosRequestConfig = {
      method,
      url,
      responseType: "json",
      data,
    };

    try {
      const result = await axios.request(request);
      return ok(result.data);
    } catch (error: any) {
      const objError = new Error(error.response.data.message);
      return err(objError);
    }
  }
}
