import Joi from "joi";
import { INoteUpdate } from "../interface/validator.interface";

export const updateNoteValidator = Joi.object<INoteUpdate>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: Value is must be a string",
   }),

   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "body: Value is must be a string",
   }),

});