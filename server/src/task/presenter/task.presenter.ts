import { Injectable } from "@nestjs/common";
import { TaskDocument } from "@src/task/model/task.model";
import { ITaskResponse } from "@src/task/interface/task-response.interface";

@Injectable()
export class TaskPresenter {

   single( document: TaskDocument ): ITaskResponse {
      return {
         id: document._id,
         title: document.title,
         isCompleted: document.isCompleted,
      };
   }

   array( documents: TaskDocument[] ): ITaskResponse[] {
      return documents.map( doc => this.single( doc ) );
   }

}