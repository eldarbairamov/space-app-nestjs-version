import { TaskRepository } from "../../repository";
import { allTaskPresenter } from "../../presenter";
import { ITaskResponse } from "../../interface";
import { PlanDocument, UserDocument } from "../../model";

export const getTasksService = async (userId: UserDocument["id"], planId: PlanDocument["id"]): Promise<ITaskResponse[]> => {

   // Find all tasks in DB
   const tasks = await TaskRepository.find({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};