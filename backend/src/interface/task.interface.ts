export interface ITaskResponse {
   readonly id: string;
   readonly planId: string;
   readonly title: string;
   readonly isCompleted: boolean;
}

export interface IAddTask {
   readonly planId: string;
   readonly title: string;
}

export interface IUpdateTask {
   readonly isCompleted: string;
}