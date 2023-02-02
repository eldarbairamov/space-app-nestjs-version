import expressAsyncHandler from "express-async-handler";
import {
   type RequestWithBodyVarParam,
   type RequestWithCustomVar, RequestWithCustomVarAndParam,
   type RequestWithCustomVarAndQuery,
} from "../interface";
import { type Response } from "express";
import { addPlanService, getPlansService, getPlansBySearchService } from "../service";
import { PlanRepository, UserRepository } from "../repository";
import { PlanDto } from "../dto/plan.dto";

export const planController = {

   addPlan: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<PlanDto>) => {
      const planDto = await addPlanService(req.userId!);
      res.json(planDto);
   }),

   getPlans: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<PlanDto[]>) => {
      const plansDto = await getPlansService(req.userId!);
      res.json(plansDto);
   }),

   updatePlan: expressAsyncHandler(async (req: RequestWithBodyVarParam<PlanDto, { planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndUpdate(req.params.planId, { title: req.body.title });
      res.json({ message: "Успішно" });
   }),

   deletePlan: expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndDelete(req.params.planId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { notesIds: req.params.planId } });
      res.json({ message: "Успішно" });
   }),

   getPlansCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await PlanRepository.count(req.userId!);
      res.json(count);
   }),

   getPlansBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<PlanDto[]>) => {
      const plansBySearchDto = await getPlansBySearchService(req.query.searchKey, req.userId!);
      res.json(plansBySearchDto);
   }),

};