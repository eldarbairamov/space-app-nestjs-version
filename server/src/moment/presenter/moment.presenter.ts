import { Injectable } from "@nestjs/common";
import { MomentDocument } from "@src/moment/model/moment.model";
import { IMomentResponse } from "@src/moment/interface/moment-response.interface";

@Injectable()
export class MomentPresenter {

   single( document: MomentDocument ): IMomentResponse {

      const date = new Date( document.date ).getTime();

      return {
         id: document.id,
         title: document.title,
         photo: document.photo,
         date: date,
         location: document.location,
         tag: document.tag,
         createdAt: date,
      };
   };

   array( document: MomentDocument[] ): IMomentResponse[] {
      return document.map( doc => this.single( doc ) );
   }

}