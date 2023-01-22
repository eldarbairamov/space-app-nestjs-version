import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth.slice";
import { notesReducer } from "./slice/notes.slice";

export const store = configureStore({
   reducer: {
      authReducer,
      notesReducer
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch