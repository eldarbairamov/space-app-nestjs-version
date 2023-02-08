import { PlanRepository, TaskRepository } from "../../repository";
import { PlanDocument, TaskDocument } from "../../model";

export const deleteTaskService = async (taskId: TaskDocument["id"], planId: PlanDocument["id"]) => {

   // Delete task
   await TaskRepository.findByIdAndDelete(taskId);

   // Pull task out of Plan document
   await PlanRepository.findByIdAndUpdate(planId, { $pull: { tasksId: taskId } });

};