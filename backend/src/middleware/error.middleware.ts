import { type NextFunction, type Request, type Response } from "express";
import { type ApiException } from "../error/api.exception";

export const errorMiddleware = (err: ApiException, req: Request, res: Response, next: NextFunction) => {
   res
      .status(err.status || 500)
      .json({
         message: err.message || "Unknown error",
         status: err.status || 500,
      });
};