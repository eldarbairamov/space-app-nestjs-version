import { Injectable } from "@nestjs/common";
import { MomentDocument } from "../model/moment.model";
import { IMomentResponse } from "../interface/moment-response.interface";

@Injectable()
export class MomentPresenter {

   single(document: MomentDocument): IMomentResponse {

      const date = new Date(document.date).getTime();

      return {
         id: document.id,
         title: document.title,
         photo: document.photo,
         date: date,
         location: document.location,
         tags: document.tags,
         createdAt: date,
      };
   };

   array(document: MomentDocument[]): IMomentResponse[] {
      return document.map(doc => this.single(doc));
   }

}