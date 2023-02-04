import { createSlice } from "@reduxjs/toolkit";

interface IAuthInitialState {
   userId: string,
   username: string,
   name: string,
   surname: string,
   avatar: string,
}

const initialState: IAuthInitialState = {
   userId: "",
   username: "",
   name: "",
   surname: "",
   avatar: "",
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
      setInfo: (state, { payload }) => {
         state.userId = payload.userId;
         if (payload.username) state.username = payload.username;
         state.name = payload.name ? payload.name : "";
         state.surname = payload.surname ? payload.surname : "";
         if (payload.avatar) state.avatar = payload.avatar;
      },
   },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;