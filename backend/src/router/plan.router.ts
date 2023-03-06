import { Router } from "express";
import { planController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const planRouter = Router();

// Get all plans
planRouter.get(
   "/",
   authMiddleware.isAccessExists,
   planController.getPlans);

// Add plan
planRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   planController.addPlan);

// Get one plan
planRouter.get(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("plan"),
   planController.getOnePlan);

// Update plan
planRouter.put(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("plan"),
   planController.updatePlan);

// Send prev request params and delete plan
planRouter.post(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("plan"),
   planController.deletePlan);
