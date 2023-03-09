import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { PlanRepository } from "../repository/plan.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private planRepository: PlanRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const planId = request.params.planId;

      if (!Types.ObjectId.isValid(planId)) throw new BadRequestException({ message: "Object ID is not valid" });

      const isPlanExists = await this.planRepository.findById(planId);
      if (!isPlanExists) throw new NotFoundException({ message: "Object does not exist" });

      return true;
   }
}