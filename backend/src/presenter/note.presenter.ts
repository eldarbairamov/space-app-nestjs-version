import { type INoteDatabase, type INoteResponse } from "../interface";

export const notePresenter = (document: INoteDatabase): INoteResponse => {

   const date = new Date(document.updatedAt).getTime()

   return {
      id: document._id,
      title: document.title,
      body: document.body,
      lastModified: date,
   };
};

export const allNotesPresenter = (documents: INoteDatabase[]): INoteResponse[] => {
   return documents.map(doc => notePresenter(doc));
};