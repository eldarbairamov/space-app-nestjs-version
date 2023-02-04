import { type IPlanDatabase} from "../interface";
import { PlanResponseDto } from "../dto";

export const planPresenter = (document: IPlanDatabase): PlanResponseDto => {
   const date = new Date(document.updatedAt).getTime();

   return {
      id: document._id,
      title: document.title,
      lastModified: date,
   };
};

export const allPlansPresenter = (documents: IPlanDatabase[]): PlanResponseDto[] => {
   return documents.map(doc => planPresenter(doc));
};