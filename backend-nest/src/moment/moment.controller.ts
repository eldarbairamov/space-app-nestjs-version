import { Body, Controller, Delete, Get, Param, Patch, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccessGuard } from "../auth/guard";
import { MomentService } from "./moment.service";
import { IMomentResponse, IMomentsResponse } from "./interface/moment-response.interface";
import { UpdateMomentDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileValidatorFilter } from "../common/exception/file-validator.filter";
import { User } from "../common/decorator/user.decorator";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { SharpPipe } from "../common/pipe/sharp.pipe";

@Controller("moments")
export class MomentController {

   constructor(private momentService: MomentService) {
   }

   // Get all moments
   @UseGuards(AccessGuard)
   @Get()
   async getMoments(
      @Query("searchKey") searchKey: string,
      @User("userId") userId: string): Promise<IMomentsResponse> {

      return this.momentService.getMoments(userId, searchKey);
   }

   // Add moment
   @UseGuards(AccessGuard)
   @Get("add")
   async addMoment(
      @User("userId") userId: string): Promise<IMomentResponse> {

      return this.momentService.addMoment(userId);
   }

   // Get one moment
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Get(":momentId")
   async getOneMoment(
      @Param("momentId") momentId: string): Promise<IMomentResponse> {

      return this.momentService.getOneMoment(momentId);
   }

   // Update moment
   @UseGuards(AccessGuard)
   @Patch(":momentId")
   async updateMoment(
      @Param("momentId") momentId: string,
      @Body() dto: UpdateMomentDto): Promise<{ message: string }> {

      await this.momentService.updateMoment(momentId, dto);
      return { message: "Success" };
   }

   // Upload photo
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
   @UseGuards(AccessGuard)
   @Delete(":momentId")
   async deleteMoment(
      @Param("momentId") momentId: string,
      @User("userId") userId: string): Promise<{ message: string }> {

      await this.momentService.deleteMoment(userId, momentId);
      return { message: "Success" };
   }

}