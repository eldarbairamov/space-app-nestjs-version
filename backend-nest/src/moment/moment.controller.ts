import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccessGuard } from "../auth/guard";
import { MomentService } from "./moment.service";
import { IMomentResponse, IMomentsResponse } from "./interface/moment-response.interface";
import { UpdateMomentDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidatorFilter } from "../common/exception/file-validator.filter";
import { User } from "../common/decorator/user.decorator";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { SharpPipe } from "../common/pipe/sharp.pipe";
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiPayloadTooLargeResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { DefaultError, FileSizeError, FileTypeError, MomentResponse, MomentsResponse, ObjectIdError, ObjNotExistError, SuccessResponse, UnauthorizedError, UpdateMomentBody, UploadImageResponse } from "../common/swagger";
import { ApiFile } from "../common/decorator/api-file.decorator";
import { QueryDto } from "../common/dto/query.dto";

@ApiTags("Moments")
@Controller("moments")
export class MomentController {

   constructor(private momentService: MomentService) {
   }

   // Get all moments
   @ApiOperation({ summary: "get all moment" })
   @ApiOkResponse({ description: "Success", type: MomentsResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Get()
   async getMoments(
      @Query() queryDto: QueryDto,
      @User("userId") userId: string): Promise<IMomentsResponse> {

      return this.momentService.getMoments(userId, queryDto);
   }

   // Add moment
   @ApiOperation({ summary: "add moment" })
   @ApiCreatedResponse({ description: "New moment was created", type: MomentResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Get("add")
   @HttpCode(201)
   async addMoment(
      @User("userId") userId: string): Promise<IMomentResponse> {

      return this.momentService.addMoment(userId);
   }

   // Get one moment
   @ApiOperation({ summary: "get moment by id" })
   @ApiParam({ name: "momentId", description: "moment id", example: "63dfe16eda233c96fc6e2604" })
   @ApiCreatedResponse({ description: "Success", type: MomentResponse })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Get(":momentId")
   async getOneMoment(
      @Param("momentId") momentId: string): Promise<IMomentResponse> {

      return this.momentService.getOneMoment(momentId);
   }

   // Update moment
   @ApiOperation({ summary: "update moment by id" })
   @ApiParam({ name: "momentId", description: "moment id", example: "63dfe16eda233c96fc6e2604" })
   @ApiBody({ type: UpdateMomentBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Patch(":momentId")
   async updateMoment(
      @Param("momentId") momentId: string,
      @Body() dto: UpdateMomentDto): Promise<{ message: string }> {

      await this.momentService.updateMoment(momentId, dto);
      return { message: "Success" };
   }

   // Upload photo
   @ApiOperation({ summary: "upload photo" })
   @ApiParam({ name: "momentId", description: "moment id", example: "63dfe16eda233c96fc6e2604" })
   @ApiConsumes("multipart/form-data")
   @ApiFile("photo")
   @ApiOkResponse({ description: "Success", type: UploadImageResponse })
   @ApiPayloadTooLargeResponse({ description: "File size error", type: FileSizeError })
   @ApiUnprocessableEntityResponse({ description: "Invalid file type", type: FileTypeError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Patch(":momentId/photo_upload")
   @UseFilters(FileValidatorFilter)
   @UseInterceptors(FileInterceptor("photo"))
   async uploadPhoto(
      @Param("momentId") momentId: string,
      @UploadedFile(SharpPipe) fileName: string): Promise<{ image: string }> {

      await this.momentService.uploadPhoto(momentId, fileName);
      return { image: fileName };
   }

   // Delete moment
   @ApiOperation({ summary: "delete moment by id" })
   @ApiParam({ name: "momentId", description: "moment id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Delete(":momentId")
   async deleteMoment(
      @Param("momentId") momentId: string,
      @User("userId") userId: string): Promise<{ message: string }> {

      await this.momentService.deleteMoment(userId, momentId);
      return { message: "Success" };
   }

}