import { MomentDocument } from "../model";
import { IMomentResponse } from "../interface";

export const momentPresenter = (document: MomentDocument): IMomentResponse => {

   const date = new Date(document.date).getTime();

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

export const allMomentsPresenter = (documents: MomentDocument[]): IMomentResponse[] => {
   return documents.map(doc => momentPresenter(doc));
};