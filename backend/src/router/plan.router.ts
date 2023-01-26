import { Router } from "express";
import { authMiddleware, commonMiddleware } from "../middleware";
import { planController } from "../controller";
import { planMiddleware } from "../middleware";

export const planRouter = Router();

// Get all plans
planRouter.get(
   "/",
   authMiddleware.isAccessTokenValid,
   planController.getPlans,
);

// Add plan
planRouter.get(
   "/add",
   authMiddleware.isAccessTokenValid,
   planController.addPlan,
);

// Update plan
planRouter.put(
   "/:planId",
   authMiddleware.isAccessTokenValid,
   planMiddleware.isObjectIdValid,
   planMiddleware.isPlanExists,
   commonMiddleware.isRequestEmpty,
   planController.updatePlan,
);

// Delete plan
planRouter.delete(
   "/:planId",
   authMiddleware.isAccessTokenValid,
   planMiddleware.isObjectIdValid,
   planMiddleware.isPlanExists,
   planController.deletePlan,
);
