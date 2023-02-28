import { Router } from "express";
import { planController } from "../controller";
import { authMiddleware, commonMiddleware } from "../middleware";

export const planRouter = Router();

// Get all plans
planRouter.get(
   "/",
   authMiddleware.isAccessExists,
   planController.getPlans);

// Get one plan
planRouter.get(
   "/get/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("plan"),
   planController.getOnePlan);

// Add plan
planRouter.get(
   "/add",
   authMiddleware.isAccessExists,
   planController.addPlan);

// Update plan
planRouter.put(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("plan"),
   planController.updatePlan);

// Delete plan
planRouter.delete(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("plan"),
   planController.deletePlan);
