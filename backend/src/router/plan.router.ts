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

// Get count
planRouter.get(
   '/count',
   authMiddleware.isAccessTokenValid,
   planController.getPlansCount
)

// Update plan
planRouter.put(
   "/:planId",
   authMiddleware.isAccessTokenValid,
   planMiddleware.isIdValid,
   planMiddleware.isPlanExists,
   commonMiddleware.isRequestEmpty,
   planController.updatePlan,
);

// Delete plan
planRouter.delete(
   "/:planId",
   authMiddleware.isAccessTokenValid,
   planMiddleware.isIdValid,
   planMiddleware.isPlanExists,
   planController.deletePlan,
);

// Get plans by search
planRouter.get(
   '/search',
   authMiddleware.isAccessTokenValid,
   planController.getPlansBySearch
)
