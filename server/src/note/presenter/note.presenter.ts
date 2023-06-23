import { Injectable } from "@nestjs/common";
import { INoteResponse } from "@src/note/interface/note-response.interface";
import { NoteDocument } from "@src/note/model/note.model";

@Injectable()
export class NotePresenter {

   single( document: NoteDocument ): INoteResponse {
      const date = new Date( document.updatedAt as string ).getTime();

      return {
         id: document._id,
         title: document.title,
         body: document.body,
         lastModified: date,
      };
   }

   array( documents: NoteDocument[] ): INoteResponse[] {
      return documents.map( doc => this.single( doc ) );
   }

}