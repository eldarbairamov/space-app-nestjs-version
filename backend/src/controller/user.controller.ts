import expressAsyncHandler from "express-async-handler";
import {
   type RequestWithBody,
   type RequestWithBodyAndCustomVar, type RequestWithCustomVar,
} from "../interface";
import { type NextFunction, type Response } from "express";
import { UserRepository } from "../repository";
import { changeEmailService, changePasswordService, getUserInfoService, updateEmailService } from "../service";

export const userController = {

   profileUpdate: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ message: string }>) => {
      await UserRepository.findOneAndUpdate({ _id: req.userId }, req.body);
      res.json({ message: "Ви успішно оновили профіль" });
   }),

   changePassword: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ newPassword: string, currentPassword: string }>, res: Response) => {
      await changePasswordService(req.body.newPassword, req.body.currentPassword, req.userId!);
      res.json({ message: "Ви успішно оновили свій пароль" });
   }),

   emailUpdateRequest: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ email: string }>, res: Response) => {
      const confirmationToken = await updateEmailService(req.userId!, req.body.email);
      res.json({
         message: "Лист із посиланням на підтведження вже летить на вказану електронну пошту!",
         token: confirmationToken,
      });
   }),

   changeEmail: expressAsyncHandler(async (req: RequestWithBody<{ confirmationToken: string }>, res: Response, next: NextFunction) => {
      await changeEmailService(req.body.confirmationToken);
      res.json({ message: "Ви успішно оновили адресу електронної пошти" });
   }),

   getUserInfo: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
      const userDto = await getUserInfoService(req.userId!);
      res.json(userDto);
   }),

};