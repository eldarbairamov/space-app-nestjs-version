import { PlanDocument } from "../model/plan.model";

export interface IPlanResponse {
   readonly id: PlanDocument["id"];
   readonly title: string;
   readonly lastModified: number;
}