import { allTaskPresenter } from "@src/presenter";
import { PlanDocument, UserDocument } from "@src/model";
import { ITaskResponse } from "@src/interface";
import { TaskRepository } from "@src/repository";

export const getTasksService = async (userId: UserDocument["id"], planId: PlanDocument["id"]): Promise<ITaskResponse[]> => {

   // Find all tasks in DB
   const tasks = await TaskRepository.find({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};