import { PlanRepository, TaskRepository } from "../../repository";
import { taskPresenter } from "../../presenter/task.presenter";
import { type ITaskDto } from "../../interface";

export const addTaskService = async (userId: string, planId: string, title: string): Promise<Partial<ITaskDto>> => {

   // Save task to DB
   const task = await TaskRepository.create({ ownerId: userId, planId, title });

   // Push task ref to the Plan document
   await PlanRepository.updateById(planId, { $push: { tasksIds: task._id } });

   // Return presented data to client
   return taskPresenter(task);

};