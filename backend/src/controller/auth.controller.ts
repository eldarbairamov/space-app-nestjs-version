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
import { OAuthRepository } from "../repository";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.json({ message: "Успішно" });
   }),

   login: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const accessTokenPairDto = await loginService(req.body, req.user!);
      console.log(accessTokenPairDto);
      res.json(accessTokenPairDto);
   }),

   activation: expressAsyncHandler(async (req: RequestWithBody<{ activationCode: string }>, res: Response) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Успішно" });
   }),

   forgotPassword: expressAsyncHandler(async (req: RequestWithBodyAndCustomVar<{ email: string }>, res: Response<{ message: string }>) => {
      await forgotPasswordService(req.body.email, req.user!);
      res.json({ message: "Успішно" });
   }),

   resetPassword: expressAsyncHandler(async (req: RequestWithBody<{ resetPasswordToken: string, password: string }>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body.resetPasswordToken, req.body.password);
      res.json({ message: "Успішно" });
   }),

   logout: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      await OAuthRepository.delete({ accessToken: req.token });
      res.json({ message: "Успішно" });
   }),

};
