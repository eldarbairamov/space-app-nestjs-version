import { EMAIL_REGEXP, ONLY_LETTERS_REGEXP } from "../constant";
import Joi from "joi";
import { type IUserSchema } from "../interface";

export const updateProfileValidator = Joi.object<Partial<IUserSchema>>({

   username: Joi.string().trim().messages({
      "string.base": "Ім'я користувача: Недопустимий формат.",
   }),

   name: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.pattern.base": "Ім'я: Недопустимий формат. Тільки букви.",
   }),

   surname: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.pattern.base": "Фамілія: Недопустимий формат. Тільки букви.",
   }),

   avatar: Joi.string().optional().allow(null, '').messages({
      "string.base": "Аватар: Недопустимий формат. Тільки букви.",
   })

});

export const emailValidator = Joi.object<{ email: string }>({

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "Електронна пошта: Недопустимий формат.",
      "string.empty": "Електронна пошта: Поле неповинно залишитись пустим.",
      "any.required": "Електронна пошта: Поле обов'язкове для заповнення.",
   }),

});