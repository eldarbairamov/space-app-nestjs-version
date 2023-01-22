import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type AxiosApiError, userService } from "../../services";
import { type IUserInfoDto } from "../../interface";


interface IAuthInitialState {
   accessToken: string | null;
   isLogin: boolean,
   username: string,
   name?: string,
   surname?: string,
   dateOfBirth?: Date | null
   avatar?: string,
   errors: string | undefined,
}

const initialState: IAuthInitialState = {
   isLogin: !!localStorage.getItem("accessToken"),
   accessToken: localStorage.getItem("accessToken"),
   username: "",
   name: "",
   surname: "",
   dateOfBirth: null,
   avatar: "",
   errors: undefined,
};

const getUserInfo = createAsyncThunk<IUserInfoDto, void, { rejectValue: string }>(
   "authSlice/getUser",
   async (_, { rejectWithValue }) => {
      try {
         return userService.getUserInfo();

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

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
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
         state.errors = payload;
      }),
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const asyncAuthActions = {
   getUserInfo
}