import { configureStore } from "@reduxjs/toolkit";
import { userReducer, noteReducer, momentReducer, appReducer, taskReducer, planReducer } from "./slice";

export const store = configureStore({
   reducer: {
      userReducer,
      noteReducer,
      momentReducer,
      planReducer,
      taskReducer,
      appReducer
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch