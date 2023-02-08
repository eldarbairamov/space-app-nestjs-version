import { updateNoteValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { NoteRepository } from "../../repository";
import { IUpdateNote } from "../../interface";
import { NoteDocument } from "../../model";

export const updateNoteService = async (noteId: NoteDocument["id"], body: IUpdateNote) => {

   // Validation
   const validation = updateNoteValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await NoteRepository.findByIdAndUpdate(noteId, body);

};