export class TaskResponseDto {
   readonly id: string;
   readonly planId: string;
   readonly title: string;
   readonly isCompleted: boolean;
}

export class TaskUpdateDto {
   readonly title: string;
   readonly body: string;
}

export class AddTaskDto {
   readonly planId: string;
   readonly title: string;
}