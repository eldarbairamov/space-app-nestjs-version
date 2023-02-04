import { type ITaskDatabase } from "../interface";
import { TaskResponseDto } from "../dto";

export const taskPresenter = (document: ITaskDatabase): TaskResponseDto => {

   return {
      id: document._id,
      title: document.title,
      planId: document.planId,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: ITaskDatabase[]): TaskResponseDto[] => {
   return documents.map(doc => taskPresenter(doc));
};