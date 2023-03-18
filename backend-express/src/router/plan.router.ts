import { Router } from "express";
import { authMiddleware, commonMiddleware } from "@src/middleware";
import { planController } from "@src/controller";

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
   commonMiddleware.isObjectExists("planId"),
   planController.getOnePlan);

// Update plan
planRouter.put(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("planId"),
   planController.updatePlan);

// Send prev request params and delete plan
planRouter.post(
   "/:planId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("planId"),
   planController.deletePlan);
