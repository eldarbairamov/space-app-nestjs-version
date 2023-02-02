import Joi from "joi";
import { NoteDto } from "../dto/note.dto";

export const noteValidator = Joi.object<Partial<NoteDto>>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),
   body: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),

});