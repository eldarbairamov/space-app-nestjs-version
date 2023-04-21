import Joi from "joi";
import { IUpdateNote } from "@src/interface";

export const updateNoteValidator = Joi.object<IUpdateNote>({

   title: Joi.string().messages({
      "string.base": "title: value must be a string",
      "string.empty": "title: is not allowed to be empty",
   }),

   body: Joi.string().allow("").messages({
      "string.base": "body: value must be a string",
   }),

});
