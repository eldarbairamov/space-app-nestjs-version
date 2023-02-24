import { Injectable } from "@nestjs/common";
import { PlanDocument } from "../model/plan.model";
import { IPlanResponse } from "../interface/plan-response.interface";

@Injectable()
export class PlanPresenter {

   single(document: PlanDocument): IPlanResponse {
      const date = new Date(document.updatedAt as string).getTime();

      return {
         id: document._id,
         title: document.title,
         lastModified: date,
      };
   }

   array(documents: PlanDocument[]): IPlanResponse[] {
      return documents.map(doc => this.single(doc));
   }

}