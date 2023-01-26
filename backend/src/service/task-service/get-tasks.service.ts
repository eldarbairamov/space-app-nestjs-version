import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter/task.presenter";

export const getTasksService = async (userId: string) => {

   // Find all tasks in DB
   const tasks = await TaskRepository.findAll({ taskOwnerId: userId });

   // Return presented data for client
   return allTaskPresenter(tasks);

};