import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { userRequests } from "../config/config";
import { GetUserInfoDto } from "../dto";
import { UpdateProfileDto } from "../dto";

export const userService = {

   profileUpdate: async (dto: UpdateProfileDto): Promise<AxiosResponse> => {
      return axiosInstance.patch<GetUserInfoDto>(userRequests.profileUpdate, dto);
   },

   changeEmailRequest: async (email: { email: string }): Promise<AxiosResponse> => {
      return axiosInstance.post<{ message: string }>(userRequests.changeEmail, email);
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      return axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken });
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      return axiosInstance.patch<{ message: string }>(userRequests.changePassword, { newPassword, currentPassword });
   },

   getUser: async (): Promise<GetUserInfoDto> => {
      const { data } = await axiosInstance.get<GetUserInfoDto>(userRequests.getUser);
      return data;
   },

   uploadAvatar: async (formData: FormData): Promise<string> => {
      const { data } = await axiosInstance.patch<{ image: string }>(userRequests.uploadAvatar, formData);
      return data.image;
   },

   deleteAvatar: async (fileName: string): Promise<void> => {
      return axiosInstance.patch(userRequests.deleteAvatar, { fileName });
   },

};