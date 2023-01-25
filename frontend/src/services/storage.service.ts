import { ACCESS_TOKEN } from "../enum/storage.enum";

export const storageService = {
   setAccessToken: (token: string) => localStorage.setItem(ACCESS_TOKEN, token),
   getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
   deleteAccessToken: () => localStorage.removeItem(ACCESS_TOKEN),
};
