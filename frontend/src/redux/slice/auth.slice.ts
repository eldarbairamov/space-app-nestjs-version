import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type AxiosApiError, userService } from "../../services";
import { type IUserInfoDto } from "../../interface";
import toast from "react-hot-toast";

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

const getUserInfo = createAsyncThunk<IUserInfoDto, void, { rejectValue: string }>(
   "authSlice/getUser",
   async (_, { rejectWithValue }) => {
      try {
         return userService.getUserInfo();

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.error(response ? response : axiosError.message);
         return rejectWithValue(response);
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
      }),
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const asyncAuthActions = {
   getUserInfo,
};