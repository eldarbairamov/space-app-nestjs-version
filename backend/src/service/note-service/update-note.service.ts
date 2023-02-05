import { updateNoteValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { NoteRepository } from "../../repository";
import { type IUpdateNote } from "../../interface";

export const updateNoteService = async (noteId: string, body: IUpdateNote) => {

   // Validation
   const validation = updateNoteValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await NoteRepository.findByIdAndUpdate(noteId, body);

}