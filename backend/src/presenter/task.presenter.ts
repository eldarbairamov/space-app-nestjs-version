import { type ITaskDatabase } from "../interface";
import { TaskDto } from "../dto/task.dto";

export const taskPresenter = (document: ITaskDatabase): Partial<TaskDto> => {

   return {
      id: document._id,
      title: document.title,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: ITaskDatabase[]): Partial<TaskDto>[] => {
   return documents.map(doc => taskPresenter(doc));
};