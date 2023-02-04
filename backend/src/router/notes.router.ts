import { Router } from "express";
import { notesController } from "../controller";
import { authMiddleware, commonMiddleware, noteMiddleware } from "../middleware";

export const notesRouter = Router();

// Add note
notesRouter.get(
   "/add",
   authMiddleware.isAccessTokenValid,
   notesController.addNote,
);

// Get all notes
notesRouter.get(
   "/",
   authMiddleware.isAccessTokenValid,
   notesController.getNotes,
);

// Get count
notesRouter.get(
   "/count",
   authMiddleware.isAccessTokenValid,
   notesController.getNotesCount,
);

// Save note
notesRouter.put(
   "/:noteId",
   authMiddleware.isAccessTokenValid,
   noteMiddleware.isIdValid,
   noteMiddleware.isNoteExists,
   commonMiddleware.isRequestValid('note'),
   notesController.updateNote,
);

// Delete note
notesRouter.delete(
   "/:noteId",
   authMiddleware.isAccessTokenValid,
   noteMiddleware.isIdValid,
   noteMiddleware.isNoteExists,
   notesController.deleteNote,
);

// Get notes by search
notesRouter.get(
   "/search",
   authMiddleware.isAccessTokenValid,
   notesController.getNotesBySearch,
);
