import expressAsyncHandler from "express-async-handler";
import { type Response, type Request } from "express";
import {
   type RequestWithBody,
   type RequestWithBodyAndCustomVar,
   type RequestWithCustomVar,
} from "../interface";
import {
   activationService,
   forgotPasswordService,
   loginService,
   registrationService,
   resetPasswordService,
} from "../service";
import { OAuthRepository } from "../repository/OAuth.repository";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.json({ message: "Ви успішно зареєструвались" });
   }),

   login: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const accessTokenPairDto = await loginService(req.body, req.user!);
      res.json({ ...accessTokenPairDto });
   }),

   activation: expressAsyncHandler(async (req: RequestWithBody<{ activationCode: string }>, res: Response) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Ваш аккаунт активований" });
   }),

   forgotPassword: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ email: string }>, res: Response<{ message: string }>) => {
      await forgotPasswordService(req.body.email, req.user!);
      res.json({ message: "Лист з посиланням вже летить до вас!" });
   }),

   resetPassword: expressAsyncHandler(async (req: RequestWithBody<{ resetPasswordToken: string, password: string }>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body.resetPasswordToken, req.body.password);
      res.json({ message: "У вас новий пароль!" });
   }),

   logout: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      await OAuthRepository.delete({ accessToken: req.token });
      res.json({ message: "Користувач вийшов з аккаунту" });
   }),

};
