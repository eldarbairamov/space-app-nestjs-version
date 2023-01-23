import { type INoteDatabase, type INoteDto } from "../interface";

export const notePresenter = (document: INoteDatabase): INoteDto => {

   return {
      title: document.title,
      body: document.body,
      lastModified: document.updatedAt,
   };
};

export const allNotesPresenter = (documents: INoteDatabase[]): INoteDto[] => {
   return documents.map(doc => notePresenter(doc));
};