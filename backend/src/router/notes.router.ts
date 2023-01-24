import { Router } from "express";
import { notesController } from "../controller";
import { authMiddleware, noteMiddleware } from "../middleware";

export const notesRouter = Router();

notesRouter.get(
   "/initial",
   authMiddleware.isAccessTokenValid,
   notesController.addNote,
);

notesRouter.get(
   "/",
   authMiddleware.isAccessTokenValid,
   notesController.getNotes,
);

notesRouter.get(
   "/count",
   authMiddleware.isAccessTokenValid,
   notesController.getNotesCount,
);

notesRouter.put(
   "/:noteId",
   authMiddleware.isAccessTokenValid,
   noteMiddleware.isRequestValid,
   notesController.saveNote,
);

notesRouter.delete(
   "/:noteId",
   authMiddleware.isAccessTokenValid,
   notesController.deleteNote,
);
