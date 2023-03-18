import Joi from "joi";
import { IUpdateMoment } from "@src/interface";

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

   tag: Joi.string().optional().allow(null, "").messages({
      "string.base": "tag: value must be a string",
   }),

});