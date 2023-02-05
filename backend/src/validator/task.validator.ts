import Joi from "joi";
import { type IAddTask } from "../interface";

export const updateTaskValidator = Joi.object<{ isCompleted: boolean }>({

   isCompleted: Joi.boolean().required().messages({
      "any.required": "isCompleted: Field is required and cannot be empty",
      "boolean.base": "isCompleted: Value is must be a boolean",
   }),

});

export const addTaskValidator = Joi.object<IAddTask>({

   title: Joi.string().required().messages({
      "any.required": "title: Field is required and cannot be empty",
      "string.base": "title: Value is must be a string",
   }),

   planId: Joi.string().required().messages({
      "any.required": "planId: Field is required and cannot be empty",
      "string.base": "planId: Value is must be a string",
   }),

});