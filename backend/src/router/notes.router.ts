import { Router } from "express";
import { notesController } from "../controller";
import { isAccessExists, isObjectExists, isRequestValid } from "../middleware";

export const notesRouter = Router();

// Add note
notesRouter.get(
   "/add",
   isAccessExists,
   notesController.addNote,
);

// Get all notes
notesRouter.get(
   "/",
   isAccessExists,
   notesController.getNotes,
);

// Get count
notesRouter.get(
   "/count",
   isAccessExists,
   notesController.getNotesCount,
);

// Update note
notesRouter.put(
   "/:noteId",
   isAccessExists,
   isObjectExists("note"),
   isRequestValid("update_note"),
   notesController.updateNote,
);

// Delete note
notesRouter.delete(
   "/:noteId",
   isAccessExists,
   isObjectExists("note"),
   notesController.deleteNote,
);

// Get notes by search
notesRouter.get(
   "/search",
   isAccessExists,
   notesController.getNotesBySearch,
);
