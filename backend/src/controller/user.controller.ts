import expressAsyncHandler from "express-async-handler";
import { type RequestWithBody, type RequestWithBodyAndVar, type RequestWithCustomVar } from "../interface";
import { type Response } from "express";
import { changeEmailService, changePasswordService, getUserInfoService, updateEmailService } from "../service";
import { UserInfoDto } from "../dto";
import { uploadAvatarService } from "../service/user-service/upload-avatar.service";
import { deleteAvatarService } from "../service/user-service/delete-avatar.service";
import { updateUserService } from "../service/user-service/update-user.service";

export const userController = {

   profileUpdate: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<Partial<UserInfoDto>>) => {
      const updatedUserDto = await updateUserService(req.userId!, req.body);
      res.json(updatedUserDto);
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

   getUser: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<Partial<UserInfoDto>>) => {
      const userInfoDto = await getUserInfoService(req.userId!);
      res.json(userInfoDto);
   }),

   uploadAvatar: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ image: string }>) => {
      const imageName = await uploadAvatarService(req.files, req.userId!);
      res.json({ image: imageName });
   }),

   deleteAvatar: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ fileName: string }>, res: Response<{ message: string }>) => {
      await deleteAvatarService(req.userId!, req.body.fileName);
      res.json({ message: "Успішно" });
   }),

};