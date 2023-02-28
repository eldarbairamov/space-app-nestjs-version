import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan } from "../../interface";

interface IPlanInitialState {
   searchKey: string;
   plans: IPlan[];
   activePlan: IPlan;
}

const initialState: IPlanInitialState = {
   plans: [],
   searchKey: "",
   activePlan: {} as IPlan,
};

const planSlice = createSlice({
   name: "plan",
   initialState: initialState,
   reducers: {

      deletePlan: (state, { payload }: PayloadAction<string>) => {
         state.plans = state.plans.filter(plan => plan.id !== payload);
      },

      addPlan: (state, { payload }: PayloadAction<IPlan>) => {
         state.plans.push(payload);
         state.plans = state.plans.sort((a, b) => b.lastModified - a.lastModified);
      },

      setPlans: (state, { payload }: PayloadAction<IPlan[]>) => {
         state.plans = payload;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setActivePlan: (state, { payload }: PayloadAction<IPlan>) => {
         state.activePlan = payload;
      },

      updateTitle: (state, { payload }: PayloadAction<string>) => {
         state.activePlan.title = payload;
      },

   },

});

export const planReducer = planSlice.reducer;
export const planAction = planSlice.actions;
