import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addPlanService, getPlansService, updatePlanService } from "../service";
import { PlanRepository, UserRepository } from "../repository";
import { IPlanResponse, IRequest } from "../interface";

export const planController = {

   addPlan: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IPlanResponse>) => {
      const plan = await addPlanService(req.userId);
      res.json(plan);
   }),

   getPlans: expressAsyncHandler(async (req: IRequest<any, any, { searchKey: string }>, res: Response<IPlanResponse[]>) => {
      const plans = await getPlansService(req.userId, req.query.searchKey);
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

};