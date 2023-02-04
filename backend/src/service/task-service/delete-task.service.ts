import { PlanRepository, TaskRepository } from "../../repository";

export const deleteTaskService = async (taskId: string, planId: string) => {

   // Delete task
   await TaskRepository.findByIdAndDelete(taskId);

   // Pull task out of Plan document
   await PlanRepository.findByIdAndUpdate(planId, { $pull: { tasksId: taskId } });

};