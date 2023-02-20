import { PlanRepository, TaskRepository } from "../../repository";
import { TaskDocument } from "../../model";

export const deleteTaskService = async (taskId: TaskDocument["id"]) => {

   // Delete task
   await TaskRepository.findByIdAndDelete(taskId);

   // Update plan
   await PlanRepository.findOneAndUpdate({ tasksIds: taskId }, { $pull: { tasksIds: taskId } });

};