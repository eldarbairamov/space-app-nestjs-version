import { axiosInstance, AxiosRes } from "./axios.service";
import { storageService } from "./storage.service";
import { authRequests } from "../config/config";
import { ILogin, IOAuth, IRegistration } from "../interface";

export const authService = {

   registration: async (body: IRegistration): AxiosRes<void> => {
      return axiosInstance.post(authRequests.registration, body);
   },

   login: async (body: ILogin): Promise<string> => {
      const result = await axiosInstance.post<IOAuth>(authRequests.login, body);

      storageService.setAccessToken(result.data.accessToken);
      storageService.setRefreshToken(result.data.refreshToken);

      return result.data.username;
   },

   forgotPassword: async (email: string): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>(authRequests.forgotPassword, { email });
      return result.data.message;
   },

   accountActivation: async (activationCode: string): AxiosRes<void> => {
      return axiosInstance.post(authRequests.accountActivation, { activationCode });
   },

   resetPassword: async (password: string, resetPasswordToken: string): AxiosRes<void> => {
      const forgotPasswordDto = { resetPasswordToken, password };

      return axiosInstance.patch(authRequests.resetPassword, forgotPasswordDto);
   },

   logout: async () => {
      const accessToken = localStorage.getItem("accessToken");

      await axiosInstance.get(authRequests.logout, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      storageService.deleteAccessToken();
      storageService.deleteRefreshToken();
   },

};