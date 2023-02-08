import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ApiException } from "../exception/api.exception";
import { Types } from "mongoose";
import { MomentRepository, NoteRepository, PlanRepository, TaskRepository } from "../repository";

export type objectType = "task" | "note" | "plan" | "moment"

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) {
         throw new ApiException("Request is empty", 400);
      }

      next();
   }),

   isObjectExists: (object: objectType) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (object === "plan") {
         const planId = req.params.planId;

         if (!planId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(planId)) throw ApiException.InvalidObjectId();

         const isPlanExist = await PlanRepository.findById(planId);
         if (!isPlanExist) throw ApiException.ObjectIsNotFound();

         next();
      }

      if (object === "task") {
         const taskId = req.params.taskId;

         if (!taskId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(taskId)) throw ApiException.InvalidObjectId();

         const isTaskExist = await TaskRepository.findById(taskId);
         if (!isTaskExist) throw ApiException.ObjectIsNotFound();

         next();
      }

      if (object === "note") {
         const noteId = req.params.noteId;

         if (!noteId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(noteId)) throw ApiException.InvalidObjectId();

         const isNoteExist = await NoteRepository.findById(noteId);
         if (!isNoteExist) throw ApiException.ObjectIsNotFound();

         next();
      }

      if (object === "moment") {
         const momentId = req.params.momentId;

         if (!momentId) throw ApiException.BadRequest();
         if (!Types.ObjectId.isValid(momentId)) throw ApiException.InvalidObjectId();

         const isNoteExist = await MomentRepository.findById(momentId);
         if (!isNoteExist) throw ApiException.ObjectIsNotFound();

         next();
      }

   }),
};