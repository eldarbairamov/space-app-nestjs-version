import { Router } from "express";
import { planController } from "../controller";
import { isAccessExists, isObjectExists, isRequestValid } from "../middleware";

export const planRouter = Router();

// Get all plans
planRouter.get(
   "/",
   isAccessExists,
   planController.getPlans);

// Add plan
planRouter.get(
   "/add",
   isAccessExists,
   planController.addPlan,
);

// Get count
planRouter.get(
   "/count",
   isAccessExists,
   planController.getPlansCount,
);

// Update plan
planRouter.put(
   "/:planId",
   isAccessExists,
   isObjectExists("plan"),
   isRequestValid("update_plan"),
   planController.updatePlan,
);

// Delete plan
planRouter.delete(
   "/:planId",
   isAccessExists,
   isObjectExists("plan"),
   planController.deletePlan,
);

// Get plans by search
planRouter.get(
   "/search",
   isAccessExists,
   planController.getPlansBySearch,
);
