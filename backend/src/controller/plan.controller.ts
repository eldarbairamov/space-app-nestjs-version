import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addPlanService, getPlansService } from "../service";
import { PlanRepository, UserRepository } from "../repository";
import { updatePlanService } from "../service/plan/update-plan.service";
import { IPlanResponse, IRequest, IQuery, IPlansResponse } from "../interface";

export const planController = {

   addPlan: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IPlanResponse>) => {
      const plan = await addPlanService(req.userId);
      res.json(plan);
   }),

   getPlans: expressAsyncHandler(async (req: IRequest<any, any, IQuery>, res: Response<IPlansResponse>) => {
      const plans = await getPlansService(req.userId, req.query);
      res.json(plans);
   }),

   updatePlan: expressAsyncHandler(async (req: IRequest<{ title: string }, { planId: string }, any>, res: Response<{ message: string }>) => {
      await updatePlanService(req.params.planId, req.body);
      res.json({ message: "Success" });
   }),

   deletePlan: expressAsyncHandler(async (req: IRequest<any, { planId: string }, any>, res: Response<{ message: string }>) => {
      await PlanRepository.findByIdAndDelete(req.params.planId);
      await UserRepository.findByIdAndUpdate(req.userId, { $pull: { plansIds: req.params.planId } });
      res.json({ message: "Success" });
   }),

   getPlansCount: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<number>) => {
      const count = await PlanRepository.count(req.userId);
      res.json(count);
   }),

};