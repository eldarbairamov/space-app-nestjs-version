import { configureStore } from "@reduxjs/toolkit";
import { userReducer, notesReducer } from "./slice";

export const store = configureStore({
   reducer: {
      userReducer,
      notesReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch