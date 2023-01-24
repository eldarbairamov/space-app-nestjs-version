import Joi from "joi";
import { INoteDto } from "../interface/note.interface";

export const noteValidator = Joi.object<Partial<INoteDto>>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),
   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),

});