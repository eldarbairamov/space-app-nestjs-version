import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addPlanService, getPlansService, getPlansBySearchService } from "../service";
import { PlanRepository, UserRepository } from "../repository";
import { updatePlanService } from "../service/plan-service/update-plan.service";
import { IPlanResponse, IUpdatePlan, RequestWithBodyVarParam, RequestWithCustomVar, RequestWithCustomVarAndParam, RequestWithCustomVarAndQuery } from "../interface";

export const planController = {

   addPlan: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanResponse>) => {
      const planDto = await addPlanService(req.userId!);
      res.json(planDto);
   }),

   getPlans: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IPlanResponse[]>) => {
      const plansDto = await getPlansService(req.userId!);
      res.json(plansDto);
   }),

   updatePlan: expressAsyncHandler(async (req: RequestWithBodyVarParam<IUpdatePlan, { planId: string }>, res: Response<{ message: string }>) => {
      await updatePlanService(req.params.planId, req.body);
      res.json({ message: "Success" });
   }),

   deletePlan: expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ planId: string }>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndDelete(req.params.planId);
      await UserRepository.findByIdAndUpdate(req.userId!, { $pull: { plansIds: req.params.planId } });
      res.json({ message: "Success" });
   }),

   getPlansCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await PlanRepository.count(req.userId!);
      res.json(count);
   }),

   getPlansBySearch: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ searchKey: string }>, res: Response<IPlanResponse[]>) => {
      const plansBySearchDto = await getPlansBySearchService(req.query.searchKey, req.userId!);
      res.json(plansBySearchDto);
   }),

};