import { type IPlanDatabase, type IPlanDto } from "../interface";

export const planPresenter = (document: IPlanDatabase): IPlanDto => {
   const date = new Date(document.updatedAt).getTime();

   return {
      id: document._id,
      title: document.title,
      lastModified: date,
   };
};

export const allPlansPresenter = (documents: IPlanDatabase[]): IPlanDto[] => {
   return documents.map(doc => planPresenter(doc));
};