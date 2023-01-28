import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter/task.presenter";

export const getTasksService = async (userId: string, planId: string) => {

   // Find all tasks in DB
   const tasks = await TaskRepository.findAll({ taskOwnerId: userId, planId });

   // Return presented data for client
   return allTaskPresenter(tasks);

};