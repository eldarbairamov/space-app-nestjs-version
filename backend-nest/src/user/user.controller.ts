import { Body, Controller, Get, Patch, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ChangePasswordDto, ProfileUpdateDto } from "./dto";
import { AccessGuard } from "../auth/guard";
import { IUserInfoResponse } from "./interface/user-info-response.interface";
import { IUpdateProfileResponse } from "./interface/update-profile-response.interface";
import { FileValidatorFilter } from "../common/exception/file-validator.filter";
import { User } from "../common/decorator/user.decorator";
import { SharpPipe } from "../common/pipe/sharp.pipe";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiDefaultResponse, ApiOkResponse, ApiOperation, ApiPayloadTooLargeResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ChangeEmailAcceptBody, ChangeEmailRequest, ChangePasswordBody, DeleteAvatarBody, GetUserResponse, DefaultError, FileSizeError, FileTypeError, SuccessResponse, UnauthorizedError, UploadImageResponse } from "../common/swagger";
import { ApiFile } from "../common/decorator/api-file.decorator";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {

   constructor(private userService: UserService) {
   }

   // Get user info
   @ApiOperation({ summary: "get user info" })
   @ApiOkResponse({ description: "Success", type: GetUserResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Get("get_user")
   async getUserInfo(
      @User("userId") userId: string): Promise<IUserInfoResponse> {

      return this.userService.getUserInfo(userId);
   }

   // Change email: request
   @ApiOperation({ summary: "change email request" })
   @ApiBody({ type: ChangeEmailRequest, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Post("email_change")
   async changeEmailRequest(
      @Body("email") email: string): Promise<{ message: string }> {

      await this.userService.changeEmailRequest(email);
      return { message: "Success" };
   }

   // Update user profile
   @ApiOperation({ summary: "update user" })
   @ApiOkResponse({ description: "Success", type: ProfileUpdateDto })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Patch("profile_update")
   async profileUpdate(
      @User("userId") userId: string,
      @Body() dto: ProfileUpdateDto): Promise<IUpdateProfileResponse> {

      return this.userService.profileUpdate(userId, dto);
   }

   // Accept new email
   @ApiOperation({ summary: "change email accept" })
   @ApiBody({ type: ChangeEmailAcceptBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @Patch("email_new")
   async changeEmail(
      @Body("confirmationToken") confirmationToken: string): Promise<{ message: string }> {

      await this.userService.changeEmail(confirmationToken);
      return { message: "Success" };
   }

   // Accept new password
   @ApiOperation({ summary: "change password" })
   @ApiBody({ type: ChangePasswordBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Patch("password_new")
   async changePassword(
      @User("userId") userId: string,
      @Body() dto: ChangePasswordDto): Promise<{ message: string }> {

      await this.userService.changePassword(userId, dto);
      return { message: "Success" };
   }

   // Upload avatar
   @ApiOperation({ summary: "upload avatar" })
   @ApiConsumes("multipart/form-data")
   @ApiFile("avatar")
   @ApiOkResponse({ description: "Success", type: UploadImageResponse })
   @ApiPayloadTooLargeResponse({ description: "File size error", type: FileSizeError })
   @ApiUnprocessableEntityResponse({ description: "Invalid file type", type: FileTypeError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Patch("avatar_upload")
   @UseFilters(FileValidatorFilter)
   @UseInterceptors(FileInterceptor("avatar"))
   async uploadAvatar(
      @User("userId") userId: string,
      @UploadedFile(SharpPipe) fileName: string): Promise<{ image: string }> {

      await this.userService.uploadAvatar(fileName, userId);
      return { image: fileName };
   }

   // Send image name and delete it
   @ApiOperation({ summary: "send file name and delete avatar" })
   @ApiBody({ type: DeleteAvatarBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Patch("avatar_delete")
   async deleteAvatar(
      @User("userId") userId: string,
      @Body("fileName") fileName: string) {

      await this.userService.deleteAvatar(fileName, userId);
      return { message: "Success" };
   }
}