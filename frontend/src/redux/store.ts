import { configureStore } from "@reduxjs/toolkit";
import { userReducer, noteReducer, momentReducer } from "./slice";

export const store = configureStore({
   reducer: {
      userReducer,
      notesReducer: noteReducer,
      momentReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch