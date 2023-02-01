import Joi from "joi";
import { type IPlanDto } from "../interface";

export const planValidator = Joi.object<Partial<IPlanDto>>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "Недопустимий формат даних",
   }),

});