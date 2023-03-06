import { PlanDocument } from "../model";

export interface IPlanResponse {
   readonly id: PlanDocument["id"];
   readonly title: string;
   readonly lastModified: number;
}

export interface IPlansResponse {
   data: IPlanResponse[],
   count: number
}
