import { type IPlanDatabase} from "../interface";
import { PlanDto } from "../dto/plan.dto";

export const planPresenter = (document: IPlanDatabase): PlanDto => {
   const date = new Date(document.updatedAt).getTime();

   return {
      id: document._id,
      title: document.title,
      lastModified: date,
   };
};

export const allPlansPresenter = (documents: IPlanDatabase[]): PlanDto[] => {
   return documents.map(doc => planPresenter(doc));
};