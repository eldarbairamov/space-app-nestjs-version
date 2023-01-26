import { Router } from "express";
import { authMiddleware, commonMiddleware } from "../middleware";
import { planController } from "../controller";

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
   commonMiddleware.isRequestEmpty,
   planController.updatePlan,
);

// Delete plan
planRouter.delete(
   "/:planId",
   authMiddleware.isAccessTokenValid,
   planController.deletePlan,
);
