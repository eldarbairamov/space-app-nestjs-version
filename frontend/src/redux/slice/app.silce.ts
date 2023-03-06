import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
   isDark: boolean;
}

const initialState: IInitialState = {
   isDark: localStorage.getItem("isDark") === 'true',
};

const appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {
      switchTheme: (state, { payload }) => {
         state.isDark = payload;
         localStorage.setItem("isDark", String(payload));
      },
   },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;