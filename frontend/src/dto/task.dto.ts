export class AddTaskDto {
   readonly planId: string;
   readonly title: string;
}

export class GetTaskDto {
   readonly id: string;
   readonly planId: string;
   readonly title: string;
   readonly isCompleted: boolean;
}