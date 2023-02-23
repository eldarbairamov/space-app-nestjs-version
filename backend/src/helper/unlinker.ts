import { unlink } from "fs/promises";

export const unlinker = async (path: string) => {
   try {
      await unlink(path);
   } catch {
      console.log("Unlink: Error");
   }
};