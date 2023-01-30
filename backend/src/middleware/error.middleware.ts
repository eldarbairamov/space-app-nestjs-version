import { type NextFunction, type Request, type Response } from "express";
import { type ApiError } from "../error/Api.error";

export const errorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
   res
      .status(err.status || 500)
      .json({
         message: err.message || "Unknown error",
         status: err.status || 500,
      });
};