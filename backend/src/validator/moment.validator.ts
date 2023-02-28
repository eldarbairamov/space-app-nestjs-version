import Joi from "joi";
import { IUpdateMoment } from "../interface";

export const updateMomentValidator = Joi.object<IUpdateMoment>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: value must be a string",
   }),

   photo: Joi.string().optional().allow(null, "").messages({
      "string.base": "photo: value must be a string",
   }),

   location: Joi.string().optional().allow(null, "").messages({
      "string.base": "location: value must be a string",
   }),

   date: Joi.number().optional().allow(null, "").messages({
      "number.base": "date: value must be a number",
   }),

   tags: Joi.array().items(
      Joi.string().optional().allow(null, "").messages({
         "string.base": "tags: value must be a string",
      })).optional().allow(null, "").messages({
      "array.base": "tags: must be an array",
   }),

});