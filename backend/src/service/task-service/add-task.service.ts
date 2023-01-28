import { PlanRepository, TaskRepository } from "../../repository";
import { taskPresenter } from "../../presenter/task.presenter";

export const addTaskService = async (userId: string, planId: string, title: string) => {

   // Save task to DB
   const task = await TaskRepository.create({ taskOwnerId: userId, planId, title });

   // Push task ref to the Plan document
   await PlanRepository.updateById(planId, { $push: { tasksIds: task._id } });

   // Return presented data for client
   return taskPresenter(task);

};