import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreatePlanDto } from "./dto";
import { AccessGuard } from "../auth/guard";
import { IPlanResponse } from "./interface/plan-response.interface";
import { User } from "../common/decorator/user.decorator";

@Controller("plans")
export class PlanController {

   constructor(private planService: PlanService) {
   }

   // Add plan
   @UseGuards(AccessGuard)
   @Get("add")
   async addPlan(
      @User("userId") userId: string): Promise<IPlanResponse> {

      return this.planService.addPlan(userId);
   }

   // Update plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":planId")
   async updatePlan(
      @Param("planId") noteId: string,
      @Body() dto: CreatePlanDto): Promise<IPlanResponse> {

      return this.planService.updatePlan(noteId, dto);
   }

   // Get all plans
   @UseGuards(AccessGuard)
   @Get()
   async getPlans(
      @Query("searchKey") searchKey: string,
      @User("userId") userId: string): Promise<IPlanResponse[]> {

      return this.planService.getPlans(userId, searchKey);
   }

   // Get one plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Get('get/:planId')
   async getOnePlan(
      @Param("planId") planId: string): Promise<IPlanResponse> {

      return this.planService.getOnePlan(planId);
   }

   // Delete plan
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":planId")
   async deletePlan(
      @User("userId") userId: string,
      @Param("planId") noteId: string): Promise<{ message: string }> {

      await this.planService.deletePlan(noteId, userId);
      return { message: "Success" };
   }

}