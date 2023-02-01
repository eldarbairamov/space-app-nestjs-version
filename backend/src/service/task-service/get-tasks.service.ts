import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter/task.presenter";
import { type ITaskDto } from "../../interface";

export const getTasksService = async (userId: string, planId: string): Promise<Partial<ITaskDto>[]> => {

   // Find all tasks in DB
   const tasks = await TaskRepository.findAll({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};