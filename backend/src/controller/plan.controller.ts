import expressAsyncHandler from "express-async-handler";
import { type RequestWithCustomVar } from "../interface";
import { type Response } from "express";
import { planRepository } from "../repository";

export const planController = {

   addPlan: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response) => {
      const plan = await planRepository.create({ planOwnerId: req.userId });

      res.json(plan);
   }),

   updatePlan: expressAsyncHandler(async (req, res) => {

   }),

   deletePlan: expressAsyncHandler(async (req, res) => {

   }),

   getAllPlans: expressAsyncHandler(async (req, res) => {

   }),

};