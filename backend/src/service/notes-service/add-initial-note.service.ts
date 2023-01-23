import { NoteRepository } from "../../repository/Note.repository";
import { notePresenter } from "../../presenter/note.presenter";

export const addInitialNoteService = async (userId: string) => {

   // Create note initial state
   const noteInitialState = {
      noteOwnerId: userId,
      title: "Нова замітка",
      body: "",
   };

   // Save note initial state to DB
   const noteInitialStateDb = await NoteRepository.create(noteInitialState);

   // Return presented data for client
   return notePresenter(noteInitialStateDb)

};