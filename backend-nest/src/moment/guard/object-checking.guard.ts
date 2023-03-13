import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { MomentRepository } from "../repository/moment.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private momentRepository: MomentRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const momentId = request.params.momentId;

      if (!Types.ObjectId.isValid(momentId)) throw new BadRequestException({ message: "Object ID is not valid" });

      const isObjectExists = await this.momentRepository.findById(momentId);
      if (!isObjectExists) throw new NotFoundException({ message: "Object does not exist" });

      return true;
   }

}