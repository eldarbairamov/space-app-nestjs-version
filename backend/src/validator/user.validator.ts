import { EMAIL_REGEXP, ONLY_LETTERS_REGEXP } from "../constant";
import Joi from "joi";
import { IChangePassword, IResetPassword, IUpdateProfile } from "../interface";

export const updateProfileValidator = Joi.object<IUpdateProfile>({

   username: Joi.string().trim().messages({
      "string.base": "username: Value must be a string",
   }),

   name: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.base": "name: Value must be a string",
      "string.pattern.base": "name: Value must contain only letters",
   }),

   surname: Joi.string().pattern(ONLY_LETTERS_REGEXP).trim().optional().allow(null, "").messages({
      "string.base": "surname: Value must be a string",
      "string.pattern.base": "surname: Value must contain only letters",
   }),

});

export const emailValidator = Joi.object<{ email: string }>({

   email: Joi.string().pattern(EMAIL_REGEXP).required().trim().messages({
      "string.pattern.base": "email: Value must be an email",
      "string.empty": "email: Field is required and cannot be empty",
      "any.required": "email: Field is required and cannot be empty",
   }),

});

export const changePasswordValidator = Joi.object<IChangePassword>({

   newPassword: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: Value must be a string",
      "string.max": "password: Value must be less than 20",
      "string.min": "password: Value must be greater than 6",
      "string.empty": "password: Field is required and cannot be empty",
      "any.required": "password: Field is required and cannot be empty",
   }),

   currentPassword: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: Value must be a string",
      "string.max": "password: Value must be less than 20",
      "string.min": "password: Value must be greater than 6",
      "string.empty": "password: Field is required and cannot be empty",
      "any.required": "password: Field is required and cannot be empty",
   }),

});

export const resetPasswordValidator = Joi.object<IResetPassword>({

   resetPasswordToken: Joi.string().required().trim().messages({
      "string.empty": "fileName: Field is required and cannot be empty",
      "any.required": "fileName: Field is required and cannot be empty",
   }),

   password: Joi.string().min(6).max(20).required().trim().messages({
      "string.base": "password: Value must be a string",
      "string.max": "password: Value must be less than 20",
      "string.min": "password: Value must be greater than 6",
      "string.empty": "password: Field is required and cannot be empty",
      "any.required": "password: Field is required and cannot be empty",
   }),

});

export const fileNameValidator = Joi.object<{ fileName: string }>({

   fileName: Joi.string().required().trim().messages({
      "string.empty": "fileName: Field is required and cannot be empty",
      "any.required": "fileName: Field is required and cannot be empty",
   }),

});

export const changeEmailValidator = Joi.object<{ confirmationToken: string }>({

   confirmationToken: Joi.string().required().trim().messages({
      "string.empty": "fileName: Field is required and cannot be empty",
      "any.required": "fileName: Field is required and cannot be empty",
   }),

});