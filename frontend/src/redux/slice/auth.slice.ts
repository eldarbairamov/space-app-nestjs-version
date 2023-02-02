import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";
import { catchErrors } from "../../helper";
import { UserInfoDto } from "../../dto";

interface IAuthInitialState {
   username: string,
   name?: string,
   surname?: string,
   avatar?: string,
}

const initialState: IAuthInitialState = {
   username: "",
   name: "",
   surname: "",
   avatar: "",
};

const getUserInfo = createAsyncThunk<UserInfoDto, void>(
   "authSlice/getUser",
   async (_, { rejectWithValue }) => {
      try {
         return userService.getUserInfo();

      } catch (e) {
         return rejectWithValue(e);
      }
   });

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: builder => builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
         state.avatar = payload.avatar;
         state.name = payload.name;
         state.surname = payload.surname;
         state.username = payload.username;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
         catchErrors(payload);
      }),
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const asyncAuthActions = {
   getUserInfo,
};