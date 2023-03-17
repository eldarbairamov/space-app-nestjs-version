import { IPlanResponse } from "../interface";
import { PlanDocument } from "../model";

export const planPresenter = (document: PlanDocument): IPlanResponse => {

   const date = new Date(document.updatedAt as string).getTime();

   return {
      id: document.id,
      title: document.title,
      lastModified: date,
   };
};

export const allPlansPresenter = (documents: PlanDocument[]): IPlanResponse[] => {
   return documents.map(doc => planPresenter(doc));
};