import Joi from "joi";
import { IUpdateMoment } from "../interface";

export const updateMomentValidator = Joi.object<IUpdateMoment>({

   title: Joi.string().optional().allow(null, "").messages({
      "string.base": "title: Value must be a string",
   }),

   photo: Joi.string().optional().allow(null, "").messages({
      "string.base": "photo: Value must be a string",
   }),

   location: Joi.string().optional().allow(null, "").messages({
      "string.base": "location: Value must be a string",
   }),

   date: Joi.date().optional().allow(null, "").messages({
      "date.base": "date: Value must be a date",
   }),

   tags: Joi.array().items(
      Joi.string().optional().allow(null, "").messages({
         "string.base": "tags: Value must be a string",
      })).optional().allow(null, "").messages({
      "array.base": "tags: Must be an array",
   }),

});