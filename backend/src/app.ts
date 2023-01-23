import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import express, { type Application } from "express";
import { errorMiddleware } from "./middleware";
import { config } from "./config";
import { authRouter } from "./router/auth.router";
import { userRouter } from "./router/user.router";
import { notesRouter } from "./router/notes.router";

const app: Application = express();
mongoose.set("strictQuery", false);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routing
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter)

// Error middleware
app.use(errorMiddleware);

// Start server:
const start = async () => {
   await mongoose.connect(`${ config.MONGO_URI }`);
   app.listen(config.PORT);
};

start()
   .then(() => console.log(`Database is connected. Server started on ${ config.PORT } port`))
   .catch(e => console.log(e));

