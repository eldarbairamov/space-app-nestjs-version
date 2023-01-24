import Joi from "joi";
import { type IUserInfoDto } from "../interface";
import { onlyLettersRegex } from "../enum/regexp.enum";

export const updateProfile = Joi.object<IUserInfoDto>({

   username: Joi.string().trim().required().messages({
      "string.empty": "Поле неповинно залишитись пустим",
   }),

   name: Joi.string().pattern(onlyLettersRegex).trim().optional().messages({
      "string.pattern.base": "Тільки букви",
      "string.empty": "Поле неповинно залишитись пустим",
   }),

   surname: Joi.string().pattern(onlyLettersRegex).trim().optional().messages({
      "string.pattern.base": "Тільки букви",
      "string.empty": "Поле неповинно залишитись пустим",
   }),

});