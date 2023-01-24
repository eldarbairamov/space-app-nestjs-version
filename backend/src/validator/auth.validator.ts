import Joi from "joi";
import { type IUserSchema } from "../interface";
import { emailRegex } from "../enum/regexp.enum";

export const authValidator = Joi.object<Partial<IUserSchema>>({

   username: Joi.string().trim().messages({
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Не валідна електронна пошта",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});
