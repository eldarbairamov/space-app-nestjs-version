import { updateTaskValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { type IUpdateTask } from "../../interface";
import { TaskRepository } from "../../repository";

export const updateTaskService = async (taskId: string, body: IUpdateTask) => {

   // Validation
   const validation = updateTaskValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update task
   await TaskRepository.findByIdAndUpdate(taskId, { isCompleted: body.isCompleted });

};