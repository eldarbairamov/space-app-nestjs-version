import { PlanDocument } from "../../plan/model/plan.model";
import { ApiProperty } from "@nestjs/swagger";
import { ITaskResponse } from "../../task/interface/task-response.interface";
import { TaskDocument } from "../../task/model/task.model";

export class GetTasksBody {
   @ApiProperty({ example: "63ffca12826b87decc6fee24" })
   private planId: PlanDocument["id"];
}

export class TaskResponse implements ITaskResponse {
   @ApiProperty({ example: "63ffca12826b87decc6fee24" })
   readonly id: TaskDocument["id"];

   @ApiProperty({ example: true })
   readonly isCompleted: boolean;

   @ApiProperty({ example: "Learn English" })
   readonly title: string;
}

export class AddTaskBody {
   @ApiProperty({ example: "Project" })
   readonly title: string;

   @ApiProperty({ example: "63ffca12826b87decc6fee24" })
   readonly planId: PlanDocument["id"];
}

export class UpdateTaskBody {
   @ApiProperty({example: "true"})
   readonly isCompleted: boolean
}