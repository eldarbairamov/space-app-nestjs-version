import Joi from "joi";
import { type IUserSchema } from "../interface";
import { EMAIL_REGEXP } from "../constant";

export const authValidator = Joi.object<Partial<IUserSchema>>({

   username: Joi.string().trim().messages({
      "any.required": "Ім'я користувача: Поле обов'язкове для заповнення",
      "string.empty": "Ім'я користувача: Поле неповинно залишитись пустим",
   }),

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "Електронна пошта: Недопустимий формат. Тільки букви.",
      "string.empty": "Електронна пошта: Поле неповинно залишитись пустим",
      "any.required": "Електронна пошта: Поле обов'язкове для заповнення",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль: Не більше 20-и символів",
      "string.min": "Пароль: Не менше 6-и символів",
      "string.empty": "Пароль: Поле неповинно залишитись пустим",
      "any.required": "Пароль: Поле обов'язкове для заповнення",
   }),

});
