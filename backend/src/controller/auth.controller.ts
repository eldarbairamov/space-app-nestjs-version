import expressAsyncHandler from "express-async-handler";
import { type Response, type Request } from "express";
import {
   activationService,
   forgotPasswordService,
   loginService,
   registrationService,
   resetPasswordService,
} from "../service";
import { OAuthRepository } from "../repository";
import {
   type IOAuthResponse,
   type IResetPassword,
   type RequestWithBody,
   type RequestWithBodyAndVar,
   type RequestWithCustomVar,
} from "../interface";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.json({ message: "Успішно" });
   }),

   login: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IOAuthResponse>) => {
      const accessTokenPairDto = await loginService(req.body, req.user!);
      res.json(accessTokenPairDto);
   }),

   activation: expressAsyncHandler(async (req: RequestWithBody<{ activationCode: string }>, res: Response<{ message: string }>) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Успішно" });
   }),

   forgotPassword: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ email: string }>, res: Response<{ message: string }>) => {
      await forgotPasswordService(req.body.email, req.user!);
      res.json({ message: "Успішно" });
   }),

   resetPassword: expressAsyncHandler(async (req: RequestWithBody<IResetPassword>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body);
      res.json({ message: "Успішно" });
   }),

   logout: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ message: string }>) => {
      await OAuthRepository.deleteOne({ accessToken: req.token });
      res.json({ message: "Успішно" });
   }),

};
