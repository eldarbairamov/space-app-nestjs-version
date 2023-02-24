import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreateTaskDto } from "./dto";
import { AccessGuard } from "../auth/guard";
import { ITaskResponse } from "./interface/task-response.interface";
import { User } from "../common/decorator/user.decorator";

@Controller("tasks")
export class TaskController {

   constructor(private taskService: TaskService) {
   }

   // Add note
   @UseGuards(AccessGuard)
   @Post("add")
   async addTask(
      @User("userId") userId: string,
      @Body() dto: CreateTaskDto): Promise<ITaskResponse> {

      return this.taskService.addTask(dto, userId);
   }

   // Update task status
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Patch(":taskId")
   async updateTaskStatus(
      @Param("taskId") taskId: string,
      @Body("isCompleted") isCompleted: boolean): Promise<ITaskResponse> {

      return this.taskService.updateTaskStatus(taskId, isCompleted);
   }

   // Get all tasks
   @UseGuards(AccessGuard)
   @Post()
   async getTasks(
      @Body("planId") planId: string): Promise<ITaskResponse[]> {

      return this.taskService.getTasks(planId);
   }

   // Delete task
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":taskId")
   async deleteTask(
      @Param("taskId") taskId: string): Promise<{ message: string }> {

      await this.taskService.deleteTask(taskId);
      return { message: "Success" };
   }

}