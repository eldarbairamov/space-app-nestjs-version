import expressAsyncHandler from "express-async-handler";
import {
   type IPlanDto,
   type RequestWithBodyVarParams,
   type RequestWithCustomVar,
   type RequestWithCustomVarAndParams, RequestWithParams,
} from "../interface";
import { type Response } from "express";
import { addPlanService } from "../service/plans-service/add-plan.service";
import { getPlansService } from "../service/plans-service/get-plans.service";
import { PlanRepository } from "../repository";

export const planController = {

   addPlan: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanDto>) => {
      const plan = await addPlanService(req.userId!);
      res.json(plan);
   }),

   getPlans: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanDto[]>) => {
      const plans = await getPlansService(req.userId!);
      res.json(plans);
   }),

   updatePlan: expressAsyncHandler(async (req: RequestWithBodyVarParams<IPlanDto, { planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.updateById(req.params.planId, { title: req.body.title });
      res.json({ message: "Успішно" });
   }),

   deletePlan: expressAsyncHandler(async (req: RequestWithParams<{ planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.deleteById(req.params.planId);
      res.json({ message: "Успішно" });
   }),

};