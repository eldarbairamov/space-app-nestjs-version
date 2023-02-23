import { configureStore } from "@reduxjs/toolkit";
import { userReducer, noteReducer, momentReducer } from "./slice";
import { planReducer } from "./slice/plan.slice";
import { taskReducer } from "./slice/task.slice";

export const store = configureStore({
   reducer: {
      userReducer,
      noteReducer,
      momentReducer,
      planReducer,
      taskReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch