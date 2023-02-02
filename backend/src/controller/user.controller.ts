import expressAsyncHandler from "express-async-handler";
import {
   type RequestWithBody,
   type RequestWithBodyAndVar, type RequestWithCustomVar,
} from "../interface";
import { type Response } from "express";
import { UserRepository } from "../repository";
import { changeEmailService, changePasswordService, getUserInfoService, updateEmailService } from "../service";
import { UserInfoDto } from "../dto/user-info.dto";

export const userController = {

   profileUpdate: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ message: string }>) => {
      await UserRepository.findByIdAndUpdate(req.userId!, req.body);
      res.json({ message: "Успішно" });
   }),

   changePassword: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ newPassword: string, currentPassword: string }>, res: Response<{ message: string }>) => {
      await changePasswordService(req.body.newPassword, req.body.currentPassword, req.userId!);
      res.json({ message: "Успішно" });
   }),

   changeEmailRequest: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ email: string }>, res: Response<{ message: string }>) => {
      await updateEmailService(req.userId!, req.body.email);
      res.json({ message: "Успішно" });
   }),

   changeEmail: expressAsyncHandler(async (req: RequestWithBody<{ confirmationToken: string }>, res: Response<{ message: string }>) => {
      await changeEmailService(req.body.confirmationToken);
      res.json({ message: "Успішно" });
   }),

   getUserInfo: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<Partial<UserInfoDto>>) => {
      const userInfoDto = await getUserInfoService(req.userId!);
      res.json(userInfoDto);
   }),

};