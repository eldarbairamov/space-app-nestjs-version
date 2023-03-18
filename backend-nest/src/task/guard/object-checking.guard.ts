import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { TaskRepository } from "@src/task/repository/task.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor(private taskRepository: TaskRepository) {
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const taskId = request.params.taskId;

      if (!Types.ObjectId.isValid(taskId)) throw new HttpException("Object ID is not valid", HttpStatus.BAD_REQUEST);

      const isTaskExists = await this.taskRepository.findById(taskId);
      if (!isTaskExists) throw new HttpException("Object does not exist", HttpStatus.NOT_FOUND);

      return true;
   }
}