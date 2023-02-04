import Joi from "joi";
import { emailRegex } from "../enum/regexp.enum";
import { UserDto } from "../dto";

export const registrationValidator = Joi.object<Partial<UserDto>>({

   username: Joi.string().trim().messages({
      "any.required": "Поле обов'язкове для заповнення",
      "string.empty": "Поле неповинно залишитись пустим",
   }),

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Недопустимий формат. Тільки букви.",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const loginValidator = Joi.object<Partial<UserDto>>({

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Недопустимий формат. Тільки букви.",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const emailValidator = Joi.object<Partial<UserDto>>({

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Недопустимий формат. Тільки букви.",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const resetPasswordValidator = Joi.object<Partial<UserDto>>({

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   repeat_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const changePasswordValidator = Joi.object<Partial<UserDto>>({

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   current_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   repeat_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Не більше 20-и символів",
      "string.min": "Не менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});