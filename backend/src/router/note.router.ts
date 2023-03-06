import { Router } from "express";
import { notesController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const notesRouter = Router();

// Get all notes
notesRouter.get(
   "/",
   authMiddleware.isAccessExists,
   notesController.getNotes);

// Add note
notesRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   notesController.addNote);

// Update note
notesRouter.put(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("note"),
   notesController.updateNote);

// Send prev request params and delete note
notesRouter.post(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("note"),
   notesController.deleteNote);