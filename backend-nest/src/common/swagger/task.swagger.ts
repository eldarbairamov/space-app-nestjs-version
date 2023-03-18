import { PlanDocument } from "@src/plan/model/plan.model";
import { ApiProperty } from "@nestjs/swagger";
import { ITaskResponse } from "@src/task/interface/task-response.interface";
import { TaskDocument } from "@src/task/model/task.model";

export class GetTasksBody {
   @ApiProperty({ example: "63ffca12826b87decc6fee24", required: true, type: String })
   private planId: PlanDocument["id"];
}

export class TaskResponse implements ITaskResponse {
   @ApiProperty({ example: "63ffca12826b87decc6fee24", type: String })
   readonly id: TaskDocument["id"];

   @ApiProperty({ example: true, type: Boolean })
   readonly isCompleted: boolean;

   @ApiProperty({ example: "Learn English", type: String })
   readonly title: string;
}

export class UpdateTaskBody {
   @ApiProperty({ example: true, required: true, type: Boolean })
   readonly isCompleted: boolean;
}