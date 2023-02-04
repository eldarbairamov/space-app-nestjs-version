import { type NextFunction, type Request, type Response } from "express";
import { type ApiException } from "../exception/api.exception";

export const errorMiddleware = (err: ApiException, req: Request, res: Response, next: NextFunction) => {
   res
      .status(err.status || 500)
      .json({
         message: err.message || "Сталась невідома помилка",
         status: err.status || 500,
      });
};