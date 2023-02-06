import { axiosInstance, AxiosRes } from "./axios.service";
import { userRequests } from "../config/config";
import { IGetUserInfo, IUpdateProfile } from "../interface";

export const userService = {

   profileUpdate: async (update: IUpdateProfile) => {
      return axiosInstance.patch<IGetUserInfo>(userRequests.profileUpdate, update);
   },

   changeEmailRequest: async (email: { email: string }): AxiosRes<void> => {
      return axiosInstance.post(userRequests.changeEmail, email);
   },

   changeEmail: async (confirmationToken: string): AxiosRes<void> => {
      return axiosInstance.patch(userRequests.changeEmailAccept, { confirmationToken });
   },

   changePassword: async (newPassword: string, currentPassword: string): AxiosRes<void> => {
      return axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
   },

   getUser: async (): Promise<IGetUserInfo> => {
      const { data } = await axiosInstance.get<IGetUserInfo>(userRequests.getUser);
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