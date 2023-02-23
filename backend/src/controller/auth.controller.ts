import { OAuthRepository } from "../repository";
import expressAsyncHandler from "express-async-handler";
import { type Response, type Request } from "express";
import { activationService, forgotPasswordService, loginService, registrationService, resetPasswordService, refreshService } from "../service";
import { ILogin, IOAuthResponse, IResetPassword, IRequest, IAccessTokenPair } from "../interface";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.json({ message: "Success" });
   }),

   login: expressAsyncHandler(async (req: IRequest<ILogin, any, any>, res: Response<IOAuthResponse>) => {
      const accessTokenPair = await loginService(req.body, req.user!);
      res.json(accessTokenPair);
   }),

   refresh: expressAsyncHandler(async (req: IRequest<{ refreshToken: string }, any, any>, res: Response<IAccessTokenPair>) => {
      const accessTokenPair = await refreshService(req.body.refreshToken);
      res.json(accessTokenPair);
   }),

   activation: expressAsyncHandler(async (req: IRequest<{ activationCode: string }, any, any>, res: Response<{ message: string }>) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Success" });
   }),

   forgotPassword: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response<{ message: string }>) => {
      await forgotPasswordService(req.body.email, req.user!);
      res.json({ message: "Success" });
   }),

   resetPassword: expressAsyncHandler(async (req: IRequest<IResetPassword, any, any>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body);
      res.json({ message: "Success" });
   }),

   logout: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<{ message: string }>) => {
      await OAuthRepository.deleteOne({ accessToken: req.token });
      res.json({ message: "Success" });
   }),

};
