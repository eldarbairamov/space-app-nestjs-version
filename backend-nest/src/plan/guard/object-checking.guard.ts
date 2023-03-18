import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PlanRepository } from "@src/plan/repository/plan.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private planRepository: PlanRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const planId = request.params.planId;

      if (!Types.ObjectId.isValid(planId)) throw new HttpException("Object ID is not valid", HttpStatus.BAD_REQUEST);

      const isPlanExists = await this.planRepository.findById(planId);
      if (!isPlanExists) throw new HttpException("Object does not exist", HttpStatus.NOT_FOUND);

      return true;
   }
}