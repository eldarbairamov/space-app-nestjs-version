import { Router } from "express";
import { notesController } from "../controller";
import { authMiddleware, noteMiddleware } from "../middleware";

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
   noteMiddleware.isRequestValid,
   notesController.saveNote,
);

// Delete note
notesRouter.delete(
   "/:noteId",
   authMiddleware.isAccessTokenValid,
   notesController.deleteNote,
);

// Get notes by search
notesRouter.get(
   "/search",
   authMiddleware.isAccessTokenValid,
   notesController.getNotesBySearch,
);
