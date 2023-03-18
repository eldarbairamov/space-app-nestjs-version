import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessGuard, LoginGuard, RefreshGuard, RegistrationGuard } from "./guard";
import { RegistrationDto, ResetPasswordDto } from "./dto";
import { User } from "@src/common/decorator";
import { IAccessTokenPair, ILoginResponse } from "./interface";
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiDefaultResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RequestWithUser } from "@src/common/interface/express.interface";
import { ActivationBody, CodeIsNotValid, DefaultError, EmailInUse, ForgotPassBody, LoginBody, LoginResponse, RefreshBody, RefreshResponse, SuccessResponse, UnactivatedAccount, UnauthorizedError, UserIsNotFound, WrongEmailOrPass } from "@src/common/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {

   constructor(private authService: AuthService) {
   }

   // Registration
   @ApiOperation({ summary: "registration" })
   @ApiCreatedResponse({ description: "User account was created", type: SuccessResponse })
   @ApiConflictResponse({ description: "Conflict", type: EmailInUse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(RegistrationGuard)
   @Post("registration")
   async registration(
      @Body() dto: RegistrationDto): Promise<{ message: string }> {

      await this.authService.registration(dto);
      return { message: "Success" };
   }

   // Login
   @ApiOperation({ summary: "login" })
   @ApiBody({ type: LoginBody, required: true })
   @ApiCreatedResponse({ description: "Access tokens was created", type: LoginResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: WrongEmailOrPass })
   @ApiForbiddenResponse({ description: "Forbidden", type: UnactivatedAccount })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(LoginGuard)
   @Post("login")
   async login(
      @Req() req: RequestWithUser): Promise<ILoginResponse> {

      return this.authService.login(req.user);
   }

   // Forgot password
   @ApiOperation({ summary: "forgot password" })
   @ApiBody({ type: ForgotPassBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UserIsNotFound })
   @HttpCode(200)
   @Post("password_forgot")
   async forgotPassword(
      @Body("email") email: string): Promise<{ message: string }> {

      await this.authService.forgotPassword(email);
      return { message: "Success" };
   }

   // Account activation
   @ApiOperation({ summary: "activation" })
   @ApiBody({ type: ActivationBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: CodeIsNotValid })
   @HttpCode(200)
   @Post("activation")
   async activation(
      @Body("activationCode") activationCode: string): Promise<{ message: string }> {

      await this.authService.activation(activationCode);
      return { message: "Success" };
   }

   // Refresh
   @ApiOperation({ summary: "Refresh tokens" })
   @ApiBody({ type: RefreshBody, required: true })
   @ApiCreatedResponse({ description: "Access tokens was refreshed", type: RefreshResponse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @UseGuards(RefreshGuard)
   @Post("refresh")
   async refresh(
      @User() user: { userId: string, refreshToken: string }): Promise<IAccessTokenPair> {

      return this.authService.refresh(user.userId, user.refreshToken);
   }

   // Reset password
   @ApiOperation({ summary: "reset password" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @Patch("password_reset")
   async resetPassword(
      @Body() dto: ResetPasswordDto): Promise<{ message: string }> {

      await this.authService.resetPassword(dto);
      return { message: "Success" };
   }

   // Logout
   @ApiOperation({ summary: "logout" })
   @ApiBearerAuth()
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @UseGuards(AccessGuard)
   @Get("logout")
   async logout(
      @User("token") token: string): Promise<{ message: string }> {

      await this.authService.logout(token);
      return { message: "Success" };
   }

}