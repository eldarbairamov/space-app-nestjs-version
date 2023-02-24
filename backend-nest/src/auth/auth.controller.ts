import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RequestWithUser } from "../common/interface/express.interface";
import { AccessGuard, LoginGuard, RefreshGuard, RegistrationGuard } from "./guard";
import { RegistrationDto, ResetPasswordDto } from "./dto";
import { ILoginResponse } from "./interface/login-response.interface";
import { User } from "../common/decorator/user.decorator";
import { IAccessTokenPair } from "./interface/refresh-response.interface";

@Controller("auth")
export class AuthController {

   constructor(private authService: AuthService) {
   }

   // Registration
   @UseGuards(RegistrationGuard)
   @Post("registration")
   @HttpCode(201)
   async registration(
      @Body() dto: RegistrationDto): Promise<{ message: string }> {

      await this.authService.registration(dto);
      return { message: "Success" };
   }

   // Login
   @UseGuards(LoginGuard)
   @Post("login")
   async login(
      @Req() req: RequestWithUser): Promise<ILoginResponse> {

      return this.authService.login(req.user);
   }

   // Logout
   @UseGuards(AccessGuard)
   @Get("logout")
   async logout(
      @User("token") token: string): Promise<{ message: string }> {

      await this.authService.logout(token);
      return { message: "Success" };
   }

   // Reset password
   @Patch("password_reset")
   async resetPassword(
      @Body() dto: ResetPasswordDto): Promise<{ message: string }> {

      await this.authService.resetPassword(dto);
      return { message: "Success" };
   }

   // Forgot password
   @Post("password_forgot")
   async forgotPassword(
      @Body("email") email: string): Promise<{ message: string }> {

      await this.authService.forgotPassword(email);
      return { message: "Success" };
   }

   // Account activation
   @Post("activation")
   async activation(
      @Body("activationCode") activationCode: string): Promise<{ message: string }> {

      await this.authService.activation(activationCode);
      return { message: "Success" };
   }

   // Refresh
   @UseGuards(RefreshGuard)
   @Post("refresh")
   async refresh(
      @User() user: { userId: string, refreshToken: string }): Promise<IAccessTokenPair> {

      return this.authService.refresh(user.userId, user.refreshToken);
   }

}