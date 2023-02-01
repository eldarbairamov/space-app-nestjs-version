import Joi from "joi";
import { type ITaskDto } from "../interface";

export const taskValidator = Joi.object<Partial<ITaskDto>>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),

});