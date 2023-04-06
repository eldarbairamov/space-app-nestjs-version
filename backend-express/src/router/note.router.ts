import { Router } from "express";
import { authMiddleware, commonMiddleware } from "@src/middleware";
import { notesController } from "@src/controller";

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

// Get note
notesRouter.get(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("noteId"),
   notesController.getNote)

// Update note
notesRouter.put(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("noteId"),
   notesController.updateNote);

// Send prev request params and delete note
notesRouter.post(
   "/:noteId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("noteId"),
   notesController.deleteNote);
