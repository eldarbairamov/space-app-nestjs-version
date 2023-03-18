import { PlanRepository, TaskRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { IAddTask, ITaskResponse } from "@src/interface";
import { taskPresenter } from "@src/presenter";
import { addTaskValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const addTaskService = async (userId: UserDocument["id"], body: IAddTask): Promise<ITaskResponse> => {

   // Validation
   const validation = addTaskValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Save task to DB
   const task = await TaskRepository.create({ ownerId: userId, planId: body.planId, title: body.title });

   // Push task ref to the Plan document
   await PlanRepository.findByIdAndUpdate(body.planId, { $push: { tasksIds: task._id } });

   // Return presented data to client
   return taskPresenter(task);

};