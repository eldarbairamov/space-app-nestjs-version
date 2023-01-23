import { type INoteDatabase, type INoteDto } from "../interface";

export const notePresenter = (document: INoteDatabase): INoteDto => {

   const date = new Date(document.updatedAt).getTime()

   return {
      id: document._id,
      title: document.title,
      body: document.body,
      lastModified: date,
   };
};

export const allNotesPresenter = (documents: INoteDatabase[]): INoteDto[] => {
   return documents.map(doc => notePresenter(doc));
};