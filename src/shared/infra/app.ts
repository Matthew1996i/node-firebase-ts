import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import "@shared/container";
import cors from "cors";
import express from "express";

import { handlingErrors } from "@shared/infra/middlewares/handlingErrors";

import { router } from "./routes";

const app = express();
app.use(express.json());

const allowedOrigins = [process.env.APP_URL];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(router);
app.use(handlingErrors);

export { app };
