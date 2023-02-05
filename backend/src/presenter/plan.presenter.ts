import { type IPlanDatabase, type IPlanResponse } from "../interface";

export const planPresenter = (document: IPlanDatabase): IPlanResponse => {
   const date = new Date(document.updatedAt).getTime();

   return {
      id: document._id,
      title: document.title,
      lastModified: date,
   };
};

export const allPlansPresenter = (documents: IPlanDatabase[]): IPlanResponse[] => {
   return documents.map(doc => planPresenter(doc));
};