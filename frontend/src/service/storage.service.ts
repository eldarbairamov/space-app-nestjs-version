import { ACCESS_TOKEN, REFRESH_TOKEN } from "../enum/storage.enum";

export const storageService = {
   getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
   getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),

   setAccessToken: (token: string) => localStorage.setItem(ACCESS_TOKEN, token),
   setRefreshToken: (token: string) => localStorage.setItem(REFRESH_TOKEN, token),

   deleteAccessToken: () => localStorage.removeItem(ACCESS_TOKEN),
   deleteRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN),
};
