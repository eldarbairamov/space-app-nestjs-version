import expressAsyncHandler from "express-async-handler";
import { type NextFunction, type Request, type Response } from "express";
import {
   changePasswordValidator, emailValidator, fileNameValidator, loginValidator,
   updateNoteValidator, registrationValidator, resetPasswordValidator, updateProfileValidator,
} from "../validator";
import { ApiException } from "../exception/api.exception";
import { addTaskValidator, updateTaskValidator } from "../validator/task.validator";
import { updatePlanValidator } from "../validator/plan.validator";
import { subject } from "../type/request-validation.type";


export const isRequestValid = (subject: subject) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
   if (!Object.entries(req.body).length) {
      throw new ApiException("Request is empty", 400);
   }

   // Auth
   if (subject === "registration") {
      const validation = registrationValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "login") {
      const validation = loginValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "reset_password") {
      const validation = resetPasswordValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   // Note
   if (subject === "update_note") {
      const validation = updateNoteValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   // Plan
   if (subject === "update_plan") {
      const validation = updatePlanValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   // User
   if (subject === "update_profile") {
      const validation = updateProfileValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "image_name") {
      const validation = fileNameValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "change_email") {
      const validation = emailValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "change_password") {
      const validation = changePasswordValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   // Task
   if (subject === "add_task") {
      const validation = addTaskValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

   if (subject === "update_task_status") {
      const validation = updateTaskValidator.validate(req.body);
      if (validation.error) throw new ApiException(validation.error.message, 400);

      next();
   }

});