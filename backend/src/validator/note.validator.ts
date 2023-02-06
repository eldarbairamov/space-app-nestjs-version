import Joi from "joi";
import { IUpdateNote } from "../interface";

export const updateNoteValidator = Joi.object<IUpdateNote>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: Value must be a string",
   }),

   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "body: Value must be a string",
   }),

});