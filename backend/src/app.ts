import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import express, { type Application } from "express";
import { errorMiddleware } from "./middleware";
import { config } from "./config";
import { apiRouter } from "./router/api.router";
import fileUpload from "express-fileupload";
import { cronRunner } from "./cron";
import swaggerUI from "swagger-ui-express";
import { STATIC_PATH } from "./constant/static-path.constant";
import swaggerJson from "./swagger.json";

const app: Application = express();
mongoose.set("strictQuery", false);

app.use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(cors())
   .use(fileUpload())
   .use(express.static(STATIC_PATH))
   .use("/api", apiRouter)
   .use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson))
   .use(errorMiddleware);

// Start server:
const start = async () => {
   await mongoose.connect(`${ config.MONGO_URI }`);
   app.listen(config.PORT);
   cronRunner();
};

start()
   .then(() => console.log(`Database is connected. Server started on port ${ config.PORT }`))
   .catch(e => console.log(e));

