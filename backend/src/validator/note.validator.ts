import Joi from "joi";
import { INoteUpdate } from "../interface/note.interface";

export const noteValidator = Joi.object<INoteUpdate>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Заголовок: Недопустимий формат.",
   }),
   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "Замітка: Недопустимий формат.",
   }),

});