import Joi from "joi";
import { NoteDto } from "../dto";

export const noteValidator = Joi.object<Partial<NoteDto>>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Заголовок: Недопустимий формат",
   }),
   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "Замітка: Недопустимий формат",
   }),

});