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
      await UserRepository.updateById(req.userId!, req.body);
      res.json({ message: "Успішно" });
   }),

   changePassword: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ newPassword: string, currentPassword: string }>, res: Response<{ message: string }>) => {
      await changePasswordService(req.body.newPassword, req.body.currentPassword, req.userId!);
      res.json({ message: "Успішно" });
   }),

   emailUpdate: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ email: string }>, res: Response<{ message: string, token: string }>) => {
      const confirmationToken = await updateEmailService(req.userId!, req.body.email);
      res.json({
         message: "Успішно",
         token: confirmationToken,
      });
   }),

   changeEmail: expressAsyncHandler(async (req: RequestWithBody<{ confirmationToken: string }>, res: Response<{ message: string }>, next: NextFunction) => {
      await changeEmailService(req.body.confirmationToken);
      res.json({ message: "Успішно" });
   }),

   getUserInfo: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response, next: NextFunction) => {
      const userDto = await getUserInfoService(req.userId!);
      res.json(userDto);
   }),

};