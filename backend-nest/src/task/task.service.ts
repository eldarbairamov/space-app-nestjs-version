import { Injectable } from "@nestjs/common";
import { TaskPresenter } from "./presenter/task.presenter";
import { TaskRepository } from "./repository/task.repository";
import { CreateTaskDto } from "./dto";
import { ITaskResponse } from "./interface/task-response.interface";
import { PlanRepository } from "@src/plan/repository/plan.repository";

@Injectable()
export class TaskService {

   constructor(
      private taskPresenter: TaskPresenter,
      private taskRepository: TaskRepository,
      private planRepository: PlanRepository,
   ) {
   }

   async addTask(dto: CreateTaskDto, userId: string): Promise<ITaskResponse> {
      //Create task
      const task = await this.taskRepository.create({ ownerId: userId, planId: dto.planId, title: dto.title });

      // Update plan
      await this.planRepository.findByIdAndUpdate(dto.planId, { $push: { tasksIds: task.id } });

      // Return presented data to client
      return this.taskPresenter.single(task);
   }

   async updateTaskStatus(taskId: string, status: boolean): Promise<ITaskResponse> {
      // Update task
      const task = await this.taskRepository.findByIdAndUpdate(taskId, { isCompleted: status });

      // Return presented data to client
      return this.taskPresenter.single(task);
   }

   async getTasks(planId: string): Promise<ITaskResponse[]> {
      // Find tasks
      const tasks = await this.taskRepository.find({ planId });

      // Return presented data to client
      return this.taskPresenter.array(tasks);
   }

   async deleteTask(taskId: string): Promise<void> {
      // Delete task
      await this.taskRepository.findByIdAndDelete(taskId);

      // Update plan
      await this.planRepository.findOneAndUpdate({ tasksId: taskId }, { $pull: { tasksIds: taskId } });
   }


}