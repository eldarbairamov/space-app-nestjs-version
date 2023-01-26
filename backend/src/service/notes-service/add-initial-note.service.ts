import { NoteRepository } from "../../repository";
import { notePresenter } from "../../presenter";
import { ObjectId } from "mongoose";

export const addInitialNoteService = async (userId: string) => {

   // Create note initial state
   const noteInitialState = {
      noteOwnerId: userId,
      body: "",
   };

   // Save note initial state to DB
   const noteInitialStateDb = await NoteRepository.create(noteInitialState);

   // Return presented data for client
   return notePresenter(noteInitialStateDb);

};