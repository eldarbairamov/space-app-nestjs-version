import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreatePlanDto } from "./dto";
import { IPlanResponse, IPlansResponse } from "./interface/plan-response.interface";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DefaultError, ObjectIdError, ObjNotExistError, PlanResponse, PlansResponse, SuccessResponse, UnauthorizedError } from "@src/common/swagger";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";
import { QueryDto } from "@src/common/dto";

@ApiBearerAuth()
@ApiTags( "Plans" )
@Controller( "plans" )
export class PlanController {

   constructor( private planService: PlanService ) {
   }

   // Get all plans
   @ApiOperation( { summary: "get all plans" } )
   @ApiOkResponse( { description: "Success", type: PlansResponse } )
   @ApiUnauthorizedResponse( { description: "Unauthorized", type: UnauthorizedError } )
   @ApiDefaultResponse( { description: "Unexpected errors", type: DefaultError } )
   @UseGuards( AccessGuard )
   @Get()
   async getPlans(
       @Query() queryDto: QueryDto,
       @User( "userId" ) userId: string ): Promise<IPlansResponse> {

      return this.planService.getPlans( userId, queryDto );
   }

   // Add plan
   @ApiOperation( { summary: "add plan" } )
   @ApiCreatedResponse( { description: "New plan was created", type: PlanResponse } )
   @ApiUnauthorizedResponse( { description: "Unauthorized", type: UnauthorizedError } )
   @ApiDefaultResponse( { description: "Unexpected errors", type: DefaultError } )
   @UseGuards( AccessGuard )
   @Post( "add" )
   async addPlan(
       @User( "userId" ) userId: string ): Promise<IPlanResponse> {

      return this.planService.addPlan( userId );
   }

   // Get one plan
   @ApiOperation( { summary: "get plan by id" } )
   @ApiParam( { name: "planId", description: "plan id", example: "63dfe16eda233c96fc6e2604" } )
   @ApiOkResponse( { description: "Success", type: PlanResponse } )
   @ApiBadRequestResponse( { description: "Invalid ObjectID", type: ObjectIdError } )
   @ApiNotFoundResponse( { description: "Not found", type: ObjNotExistError } )
   @ApiUnauthorizedResponse( { description: "Unauthorized", type: UnauthorizedError } )
   @ApiDefaultResponse( { description: "Unexpected errors", type: DefaultError } )
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Get( ":planId" )
   async getOnePlan(
       @Param( "planId" ) planId: string ): Promise<IPlanResponse> {

      return this.planService.getOnePlan( planId );
   }

   // Update plan
   @ApiOperation( { summary: "update plan by id" } )
   @ApiParam( { name: "planId", description: "plan id", example: "63dfe16eda233c96fc6e2604" } )
   @ApiOkResponse( { description: "Success", type: SuccessResponse } )
   @ApiBadRequestResponse( { description: "Invalid ObjectID", type: ObjectIdError } )
   @ApiNotFoundResponse( { description: "Not found", type: ObjNotExistError } )
   @ApiUnauthorizedResponse( { description: "Unauthorized", type: UnauthorizedError } )
   @ApiDefaultResponse( { description: "Unexpected errors", type: DefaultError } )
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Put( ":planId" )
   async updatePlan(
       @Param( "planId" ) noteId: string,
       @Body() dto: CreatePlanDto ): Promise<IPlanResponse> {

      return this.planService.updatePlan( noteId, dto );
   }

   // Delete plan
   @ApiOperation( { summary: "delete plan by id" } )
   @ApiParam( { name: "planId", description: "plan id", example: "63dfe16eda233c96fc6e2604" } )
   @ApiOkResponse( { description: "Success", type: PlansResponse } )
   @ApiBadRequestResponse( { description: "Invalid ObjectID", type: ObjectIdError } )
   @ApiUnauthorizedResponse( { description: "Unauthorized", type: UnauthorizedError } )
   @ApiNotFoundResponse( { description: "Not found", type: ObjNotExistError } )
   @ApiDefaultResponse( { description: "Unexpected errors", type: DefaultError } )
   @UseGuards( AccessGuard )
   @UseGuards( ObjectCheckingGuard )
   @Delete( ":planId" )
   async deletePlan(
       @User( "userId" ) userId: string,
       @Query() queryDto: QueryDto,
       @Param( "planId" ) noteId: string ): Promise<IPlansResponse> {

      return this.planService.deletePlan( noteId, userId, queryDto );
   }

}
