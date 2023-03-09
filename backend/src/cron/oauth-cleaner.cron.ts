import { CronJob } from "cron";
import { OAuthRepository } from "../repository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const oAuthCleanerCron = new CronJob("@weekly", async () => {
   try {
      const weekAgo = dayjs().utc().subtract(1, "week").format();

      await OAuthRepository.deleteMany({ createdAt: { $lte: weekAgo } });

      console.log("Clean old tokens");

   } catch (e) {
      const error = e as Error;
      console.log(error.message);
   }
});