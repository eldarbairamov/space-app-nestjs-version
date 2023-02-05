import Joi from "joi";
import { EMAIL_REGEXP } from "../constant";
import { type ILogin, type IRegistration } from "../interface";

export const registrationValidator = Joi.object<IRegistration>({

   username: Joi.string().trim().messages({
      "string.empty": "username: Field is required and cannot be empty",
      "any.required": "username: Field is required and cannot be empty",
      "string.base": "username: Value is must be a string",
   }),

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "email: Value must be an email",
      "string.empty": "email: Field is required and cannot be empty",
      "any.required": "email: Field is required and cannot be empty",
      "string.base": "email: Value is must be a string",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "password: Value must be less than 20",
      "string.min": "password: Value must be greater than 6",
      "string.empty": "password: Field is required and cannot be empty",
      "any.required": "password: Field is required and cannot be empty",
      "string.base": "password: Value is must be a string",
   }),

});

export const loginValidator = Joi.object<ILogin>({

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "email: Value must be an email",
      "string.empty": "email: Field is required and cannot be empty",
      "any.required": "email: Field is required and cannot be empty",
      "string.base": "email: Value is must be a string",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.max": "password: Value must be less than 20",
      "string.min": "password: Value must be greater than 6",
      "string.empty": "password: Field is required and cannot be empty",
      "any.required": "password: Field is required and cannot be empty",
      "string.base": "password: Value is must be a string",
   }),

});

export const activationValidator = Joi.object<{ activationCode: string }>({

   activationCode: Joi.string().required().messages({
      "any.required": "activationCode: Field is required and cannot be empty",
      "string.base": "activationCode: Value is must be a string",
   }),

});