import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter";
import { TaskResponseDto } from "../../dto";


export const getTasksService = async (userId: string, planId: string): Promise<Partial<TaskResponseDto>[]> => {

   // Find all tasks in DB
   const tasks = await TaskRepository.find({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};