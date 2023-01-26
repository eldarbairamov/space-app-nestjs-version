import { Router } from "express";
import { authMiddleware } from "../middleware";
import { planController } from "../controller/plan.controller";

export const planRouter = Router();

planRouter.get("", authMiddleware.isAccessTokenValid, planController.addPlan);
planRouter.get('', authMiddleware.isAccessTokenValid, planController.getAllPlans)
planRouter.put("", authMiddleware.isAccessTokenValid, planController.updatePlan);
planRouter.delete('', authMiddleware.isAccessTokenValid, planController.deletePlan)