import { PlanRepository, TaskRepository } from "../../repository";
import { taskPresenter } from "../../presenter";
import { TaskResponseDto } from "../../dto";

export const addTaskService = async (userId: string, planId: string, title: string): Promise<TaskResponseDto> => {

   // Save task to DB
   const task = await TaskRepository.create({ ownerId: userId, planId, title });

   // Push task ref to the Plan document
   await PlanRepository.findByIdAndUpdate(planId, { $push: { tasksIds: task._id } });

   // Return presented data to client
   return taskPresenter(task);

};