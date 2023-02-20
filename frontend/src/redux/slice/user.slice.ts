import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface";

interface IUserInitialState {
   username: string,
   name: string,
   surname: string,
   avatar: string,
   notesCount: number,
   momentsCount: number,
   plansCount: number
}

const initialState: IUserInitialState = {
   username: "",
   name: "",
   surname: "",
   avatar: "",
   momentsCount: 0,
   notesCount: 0,
   plansCount: 0,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {

      setAvatar: (state, { payload }) => {
         state.avatar = payload;
      },

      unsetAvatar: (state) => {
         state.avatar = "";
      },

      setInfo: (state, { payload }: PayloadAction<IUser>) => {
         if (payload.username) state.username = payload.username;
         if (payload.avatar) state.avatar = payload.avatar;
         state.name = payload.name ? payload.name : "";
         state.surname = payload.surname ? payload.surname : "";
         state.momentsCount = payload.momentsCount;
         state.plansCount = payload.plansCount;
         state.notesCount = payload.notesCount;
      },

   },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;