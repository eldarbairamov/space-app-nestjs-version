export interface IPlanResponse {
   readonly id: string;
   readonly title: string;
   readonly lastModified: number;
}

export interface IUpdatePlan {
   readonly title: string;
}