import { NextFunction, Request, Response } from "express";
import { RedisBootstrap } from "src/bootstrap/redis.bootstrap";

export class CacheMiddleware {
  private static setParams(key: string, params: Record<string, any>) {
    if (params) {
      Object.keys(params).forEach((param) => {
        key = key.replace(`:${param}`, params[param]);
      });
    }
    return key;
  }

  static build(prefix: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
      let cacheKey = prefix;
      cacheKey = this.setParams(cacheKey, request.params);
      cacheKey = this.setParams(cacheKey, request.query);
      cacheKey = this.setParams(cacheKey, request.body);

      const client = RedisBootstrap.connection;
      const value = await client.get(cacheKey);

      if (value) {
        console.log("Response from cache");
        response.status(200).json(JSON.parse(value));
        return;
      }

      console.log("Cache missed");
      response.locals.cacheKey = cacheKey;
    };
  }
}
