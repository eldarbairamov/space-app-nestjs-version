import { Router } from "express";
import { notesController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const notesRouter = Router();

// Add note
notesRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   notesController.addNote);

// Get all notes
notesRouter.get(
   "/",
   authMiddleware.isAccessExists,
   notesController.getNotes);

// Update note
notesRouter.put(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("note"),
   notesController.updateNote);

// Delete note
notesRouter.delete(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("note"),
   notesController.deleteNote);