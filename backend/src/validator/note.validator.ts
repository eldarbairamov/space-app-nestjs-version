import Joi from "joi";
import { type IUpdateNote } from "../interface";

export const updateNoteValidator = Joi.object<IUpdateNote>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: Value is must be a string",
   }),

   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "body: Value is must be a string",
   }),

});