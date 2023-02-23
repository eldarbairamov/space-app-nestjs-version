import { PlanRepository, TaskRepository } from "../../repository";
import { TaskDocument } from "../../model";

export const deleteTaskService = async (taskId: TaskDocument["id"]) => {

   // Delete task and update plan
   await Promise.all([
      TaskRepository.findByIdAndDelete(taskId),
      PlanRepository.findOneAndUpdate({ tasksIds: taskId }, { $pull: { tasksIds: taskId } }),
   ]);

};