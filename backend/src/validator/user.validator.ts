import { emailRegex, onlyLettersRegex } from "../enum/regexp.enum";
import Joi from "joi";
import { type IUserSchema } from "../interface";

export const updateProfileValidator = Joi.object<Partial<IUserSchema>>({

   username: Joi.string().trim().required().messages({
      "string.empty": "Поле неповинно залишитись пустим",
   }),

   name: Joi.string().pattern(onlyLettersRegex).trim().optional().messages({
      "string.pattern.base": "Тільки букви",
   }),

   surname: Joi.string().pattern(onlyLettersRegex).trim().optional().messages({
      "string.pattern.base": "Тільки букви",
   }),

});

export const emailValidator = Joi.object<{ email: string }>({

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Не валідна електронна пошта",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});