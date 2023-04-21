import Joi from "joi";

export const updatePlanValidator = Joi.object<{ title: string }>({

   title: Joi.string().messages({
      "string.base": "title: value must be a string",
      "string.empty": "title: is not allowed to be empty",
   }),

});
