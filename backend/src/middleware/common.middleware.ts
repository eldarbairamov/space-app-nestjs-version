import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Request, type Response } from "express";
import { ApiException } from "../exception/api.exception";
import { Types } from "mongoose";
import { NoteRepository, PlanRepository, TaskRepository } from "../repository";

export type objectType = "task" | "note" | "plan"

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) {
         throw new ApiException("Request is empty", 400);
      }

      next()
   }),

   isObjectExists: (object: objectType) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (object === "plan") {
         const planId = req.params.planId;

         if (!planId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(planId)) throw ApiException.ObjectID();

         const isPlanExist = await PlanRepository.findById(planId);
         if (!isPlanExist) throw ApiException.ObjectIsNotFound();

         next();
      }

      if (object === "task") {
         const taskId = req.params.taskId;

         if (!taskId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(taskId)) throw ApiException.ObjectID();

         const isTaskExist = await TaskRepository.findById(taskId);
         if (!isTaskExist) throw ApiException.ObjectIsNotFound();

         next();
      }

      if (object === "note") {
         const noteId = req.params.noteId;

         if (!noteId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(noteId)) throw ApiException.ObjectID();

         const isNoteExist = await NoteRepository.findById(noteId);
         if (!isNoteExist) throw ApiException.ObjectIsNotFound();

         next();
      }

   }),
};