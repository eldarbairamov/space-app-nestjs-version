import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Request, type Response } from "express";
import { Types } from "mongoose";
import { ApiException } from "../exception/api.exception";
import { NoteRepository, PlanRepository, TaskRepository } from "../repository";

type subject = "plan" | "task" | "note"

export const isObjectExists = (subject: subject) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

   // Plan
   if (subject === "plan") {
      const planId = req.params.planId;

      if (!planId) throw ApiException.BadRequest();
      if (!Types.ObjectId.isValid(planId)) throw ApiException.ObjectID();

      const isPlanExist = await PlanRepository.findById(planId);
      if (!isPlanExist) throw ApiException.NotFound();

      next();
   }

   // Task
   if (subject === "task") {
      const taskId = req.params.taskId;

      if (!taskId) throw ApiException.BadRequest();
      if (!Types.ObjectId.isValid(taskId)) throw ApiException.ObjectID();

      const isTaskExist = await TaskRepository.findById(taskId);
      if (!isTaskExist) throw ApiException.NotFound();

      next();
   }

   // Note
   if (subject === "note") {
      const noteId = req.params.noteId;

      if (!noteId) throw ApiException.BadRequest();
      if (!Types.ObjectId.isValid(noteId)) throw ApiException.ObjectID();

      const isNoteExist = await NoteRepository.findById(noteId);
      if (!isNoteExist) throw ApiException.NotFound();

      next();
   }

});