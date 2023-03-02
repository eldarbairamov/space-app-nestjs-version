import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { TaskRepository } from "../repository/task.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private taskRepository: TaskRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const taskId = request.params.taskId;

      if (!Types.ObjectId.isValid(taskId)) throw new BadRequestException({ message: "Object ID is not valid" });

      const isTaskExists = await this.taskRepository.findById(taskId);
      if (!isTaskExists) throw new NotFoundException({ message: "Object does not exist" });

      return true;
   }
}