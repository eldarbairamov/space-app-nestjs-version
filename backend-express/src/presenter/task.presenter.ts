import { ITaskResponse } from "../interface";
import { TaskDocument } from "../model";

export const taskPresenter = (document: TaskDocument): ITaskResponse => {

   return {
      id: document.id,
      title: document.title,
      planId: document.planId,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: TaskDocument[]): ITaskResponse[] => {
   return documents.map(doc => taskPresenter(doc));
};