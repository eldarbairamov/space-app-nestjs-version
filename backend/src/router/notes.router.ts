import { Router } from "express";
import { notesController } from "../controller/notes.controller";
import { authMiddleware } from "../middleware";

export const notesRouter = Router();

notesRouter.get("/initial", authMiddleware.isAccessTokenValid, notesController.addNote);
notesRouter.get("/", authMiddleware.isAccessTokenValid, notesController.getNotes);