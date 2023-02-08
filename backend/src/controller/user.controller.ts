import expressAsyncHandler from "express-async-handler";
import { RequestWithBody, RequestWithBodyAndVar, RequestWithCustomVar } from "../interface";
import { Response } from "express";
import { changeEmailService, uploadAvatarService, updateProfileService, deleteAvatarService, changePasswordService, getUserInfoService, updateEmailService } from "../service";
import { IChangeEmail, IChangePassword, IDeleteAvatar, IUpdateProfile, IUserInfoResponse } from "../interface";

export const userController = {

   updateProfile: expressAsyncHandler(async (req: RequestWithBodyAndVar<IUpdateProfile>, res: Response<IUpdateProfile>) => {
      const updatedUser = await updateProfileService(req.userId!, req.body);
      res.json(updatedUser);
   }),

   changePassword: expressAsyncHandler(async (req: RequestWithBodyAndVar<IChangePassword>, res: Response<{ message: string }>) => {
      await changePasswordService(req.userId!, req.body);
      res.json({ message: "Success" });
   }),

   changeEmailRequest: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ email: string }>, res: Response<{ message: string }>) => {
      await updateEmailService(req.userId!, req.body.email);
      res.json({ message: "Success" });
   }),

   changeEmail: expressAsyncHandler(async (req: RequestWithBody<IChangeEmail>, res: Response<{ message: string }>) => {
      await changeEmailService(req.body.confirmationToken);
      res.json({ message: "Success" });
   }),

   getUser: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IUserInfoResponse>) => {
      const userInfo = await getUserInfoService(req.userId!);
      res.json(userInfo);
   }),

   uploadAvatar: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ image: string }>) => {
      const imageName = await uploadAvatarService(req.files, req.userId!);
      res.json({ image: imageName });
   }),

   deleteAvatar: expressAsyncHandler(async (req: RequestWithBodyAndVar<IDeleteAvatar>, res: Response<{ message: string }>) => {
      await deleteAvatarService(req.userId!, req.body);
      res.json({ message: "Success" });
   }),

};