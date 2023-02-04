export class TaskResponseDto {
   readonly id: string;
   readonly planId: string;
   readonly title: string;
   readonly isCompleted: boolean;
}

export class AddTaskDto {
   readonly planId: string;
   readonly title: string;
}