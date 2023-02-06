import { PlanDocument, TaskDocument } from "../model";

export interface ITaskResponse {
   readonly id: TaskDocument["id"];
   readonly title: string;
   readonly isCompleted: boolean;
   readonly planId: PlanDocument["id"];
}

export interface IAddTask {
   readonly planId: PlanDocument["id"];
   readonly title: string;
}

export interface IUpdateTask {
   readonly isCompleted: string;
}