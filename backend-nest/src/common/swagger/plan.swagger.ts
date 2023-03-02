import { IPlanResponse } from "../../plan/interface/plan-response.interface";
import { PlanDocument } from "../../plan/model/plan.model";
import { ApiProperty } from "@nestjs/swagger";

export class PlanResponse implements IPlanResponse {
   @ApiProperty({ example: "63dfe16eda233c96fc6e2604" })
   readonly id: PlanDocument["id"];

   @ApiProperty({ example: "Training" })
   readonly title: string;

   @ApiProperty({ example: 1677765747660 })
   readonly lastModified: number;
}

export class UpdatePlanBody {
   @ApiProperty({example: "English Plan"})
   readonly title: string
}