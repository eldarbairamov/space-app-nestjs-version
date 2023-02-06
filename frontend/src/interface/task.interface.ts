export interface ITask {
   readonly id: string;
   readonly planId: string;
   readonly title: string;
   isCompleted: boolean;
}

export interface IAddTask {
   readonly planId: string;
   readonly title: string;
}