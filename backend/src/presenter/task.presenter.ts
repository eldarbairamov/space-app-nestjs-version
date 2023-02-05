import { type ITaskDatabase, type ITaskResponse } from "../interface";

export const taskPresenter = (document: ITaskDatabase): ITaskResponse => {

   return {
      id: document._id,
      title: document.title,
      planId: document.planId,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: ITaskDatabase[]): ITaskResponse[] => {
   return documents.map(doc => taskPresenter(doc));
};