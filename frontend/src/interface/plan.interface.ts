export interface IPlan {
   readonly id: string;
   readonly title: string;
   readonly lastModified: number;
}

export interface IPlans {
   data: IPlan[];
   readonly count: number;
   readonly page: number;
}