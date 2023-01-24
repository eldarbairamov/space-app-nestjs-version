import Joi from "joi";
import { type IUserDto } from "../interface";
import { emailRegex } from "../enum/regexp.enum";

export const registrationValidator = Joi.object<Partial<IUserDto>>({

   username: Joi.string().required().trim().messages({
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

export const loginValidator = Joi.object<Partial<IUserDto>>({

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

export const emailValidator = Joi.object<Partial<IUserDto>>({

   email: Joi.string().pattern(emailRegex).required().trim().messages({
      "string.pattern.base": "Не валідна електронна пошта",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const resetPasswordValidator = Joi.object<Partial<IUserDto>>({

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   repeat_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});

export const changePasswordValidator = Joi.object<Partial<IUserDto>>({

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   current_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

   repeat_password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "Пароль не має містити більше 20-и символів",
      "string.min": "Пароль не має містити менше 6-и символів",
      "string.empty": "Поле неповинно залишитись пустим",
      "any.required": "Поле обов'язкове для заповнення",
   }),

});