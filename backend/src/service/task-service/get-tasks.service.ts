import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter/task.presenter";
import { TaskDto } from "../../dto/task.dto";


export const getTasksService = async (userId: string, planId: string): Promise<Partial<TaskDto>[]> => {

   // Find all tasks in DB
   const tasks = await TaskRepository.find({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};