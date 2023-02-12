import { updateTaskValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { TaskRepository } from "../../repository";
import { TaskDocument } from "../../model";

export const updateTaskService = async (taskId: TaskDocument["id"], body: { isCompleted: string }) => {

   // Validation
   const validation = updateTaskValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update task
   await TaskRepository.findByIdAndUpdate(taskId, { isCompleted: body.isCompleted });

};