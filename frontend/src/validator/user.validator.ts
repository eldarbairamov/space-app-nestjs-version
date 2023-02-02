import Joi from "joi";
import { onlyLettersRegex } from "../enum/regexp.enum";
import { UserInfoDto } from "../dto";

export const updateProfile = Joi.object<Partial<UserInfoDto>>({

   username: Joi.string().trim().required().messages({
      "string.empty": "Поле неповинно залишитись пустим",
   }),

   name: Joi.string().pattern(onlyLettersRegex).trim().optional().allow(null, '').messages({
      "string.pattern.base": "Тільки букви",
   }),

   surname: Joi.string().pattern(onlyLettersRegex).trim().optional().allow(null, '').messages({
      "string.pattern.base": "Тільки букви",
   }),

});