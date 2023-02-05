import Joi from "joi";

export const updatePlanValidator = Joi.object<{ title: string }>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: Value is must be a string",
   }),

});