import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { CreateTaskDto } from "./dto";
import { ITaskResponse } from "./interface/task-response.interface";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DefaultError, GetTasksBody, ObjectIdError, ObjNotExistError, SuccessResponse, TaskResponse, UnauthorizedError, UpdateTaskBody } from "@src/common/swagger";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";

@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {

   constructor(private taskService: TaskService) {
   }

   // Get all tasks
   @ApiOperation({ summary: "get all tasks" })
   @ApiBody({ type: GetTasksBody, required: true })
   @ApiOkResponse({ type: [ TaskResponse ] })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @HttpCode(200)
   @Post()
   async getTasks(
      @Body("planId") planId: string): Promise<ITaskResponse[]> {

      return this.taskService.getTasks(planId);
   }

   // Add task
   @ApiOperation({ summary: "add task" })
   @ApiCreatedResponse({ description: "New task was created", type: TaskResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   // Add note
   @UseGuards(AccessGuard)
   @Post("add")
   async addTask(
      @User("userId") userId: string,
      @Body() dto: CreateTaskDto): Promise<ITaskResponse> {

      return this.taskService.addTask(dto, userId);
   }

   // Update task status
   @ApiOperation({ summary: "update task by id" })
   @ApiParam({ name: "taskId", description: "task id", example: "63dfe16eda233c96fc6e2604" })
   @ApiBody({ type: UpdateTaskBody, required: true })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Patch(":taskId")
   async updateTaskStatus(
      @Param("taskId") taskId: string,
      @Body("isCompleted") isCompleted: boolean): Promise<ITaskResponse> {

      return this.taskService.updateTaskStatus(taskId, isCompleted);
   }

   // Delete task
   @ApiOperation({ summary: "delete task by id" })
   @ApiParam({ name: "taskId", description: "task id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":taskId")
   async deleteTask(
      @Param("taskId") taskId: string): Promise<{ message: string }> {

      await this.taskService.deleteTask(taskId);
      return { message: "Success" };
   }

}