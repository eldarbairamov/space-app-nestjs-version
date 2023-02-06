import { OAuthRepository } from "../repository";
import expressAsyncHandler from "express-async-handler";
import { type Response, type Request } from "express";
import { activationService, forgotPasswordService, loginService, registrationService, resetPasswordService } from "../service";
import { ILogin, IOAuthResponse, IResetPassword, RequestWithBody, RequestWithBodyAndVar, RequestWithCustomVar } from "../interface";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.json({ message: "Success" });
   }),

   login: expressAsyncHandler(async (req: RequestWithBodyAndVar<ILogin>, res: Response<IOAuthResponse>) => {
      const accessTokenPairDto = await loginService(req.body, req.user!);
      res.json(accessTokenPairDto);
   }),

   activation: expressAsyncHandler(async (req: RequestWithBody<{ activationCode: string }>, res: Response<{ message: string }>) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Success" });
   }),

   forgotPassword: expressAsyncHandler(async (req: RequestWithBodyAndVar<{ email: string }>, res: Response<{ message: string }>) => {
      await forgotPasswordService(req.body.email, req.user!);
      res.json({ message: "Success" });
   }),

   resetPassword: expressAsyncHandler(async (req: RequestWithBody<IResetPassword>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body);
      res.json({ message: "Success" });
   }),

   logout: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<{ message: string }>) => {
      await OAuthRepository.deleteOne({ accessToken: req.token });
      res.json({ message: "Success" });
   }),

};
