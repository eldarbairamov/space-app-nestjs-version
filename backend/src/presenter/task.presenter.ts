import { type ITaskDatabase, type ITaskDto } from "../interface";

export const taskPresenter = (document: ITaskDatabase): Partial<ITaskDto> => {

   return {
      id: document._id,
      title: document.title,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: ITaskDatabase[]): Partial<ITaskDto>[] => {
   return documents.map(doc => taskPresenter(doc));
};