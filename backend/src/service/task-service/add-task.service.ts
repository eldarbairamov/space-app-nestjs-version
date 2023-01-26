import { TaskRepository } from "../../repository";
import { taskPresenter } from "../../presenter/task.presenter";

export const addTaskService = async (userId: string, planId: string, title: string) => {

   // Save task to DB
   const task = await TaskRepository.create({ taskOwnerId: userId, planId, title });

   // Return presented data for client
   return taskPresenter(task)

};