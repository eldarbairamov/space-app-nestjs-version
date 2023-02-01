import expressAsyncHandler from "express-async-handler";
import {
   type IPlanDto,
   type RequestWithBodyVarParams,
   type RequestWithCustomVar, RequestWithCustomVarAndParams,
   type RequestWithCustomVarAndQuery,
} from "../interface";
import { type Response } from "express";
import { addPlanService, getPlansService, getPlansBySearchService } from "../service";
import { PlanRepository, UserRepository } from "../repository";

export const planController = {

   addPlan: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanDto>) => {
      const planDto = await addPlanService(req.userId!);
      res.json(planDto);
   }),

   getPlans: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanDto[]>) => {
      const plansDto = await getPlansService(req.userId!);
      console.log(plansDto);
      res.json(plansDto);
   }),

   updatePlan: expressAsyncHandler(async (req: RequestWithBodyVarParams<IPlanDto, { planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndUpdate(req.params.planId, { title: req.body.title });
      res.json({ message: "Успішно" });
   }),

   deletePlan: expressAsyncHandler(async (req: RequestWithCustomVarAndParams<{ planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndDelete(req.params.planId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { notesIds: req.params.planId } });
      res.json({ message: "Успішно" });
   }),

   getPlansCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await PlanRepository.count(req.userId!);
      res.json(count);
   }),

   getPlansBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<IPlanDto[]>) => {
      const plansBySearchDto = await getPlansBySearchService(req.query.searchKey, req.userId!);
      res.json(plansBySearchDto);
   }),

};