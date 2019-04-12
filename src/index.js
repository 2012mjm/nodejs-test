import "./env";

import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import * as Sentry from "@sentry/node";
import favicon from "serve-favicon";

import routesV1 from "./api/v1/routes";
import json from "./middlewares/json";
import logger, { logStream } from "./utils/logger";
import * as errorHandler from "./middlewares/errorHandler";

/**
 * Sentry is an open-source error tracking tool that helps you monitor and fix crashes in real time
 * Initialize Sentry
 * https://docs.sentry.io/platforms/node/express/
 */
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) ||
  process.env.PORT ||
  "3000";
const APP_HOST = process.env.APP_HOST || "0.0.0.0";

app.use(favicon(path.join(__dirname, "/../public", "favicon.ico")));

app.set("port", APP_PORT);
app.set("host", APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// Node.js CORS middleware
app.use(cors());

// Help secure Express apps with various HTTP headers
app.use(helmet());

// Node.js compression middleware
app.use(compression());

// HTTP request logger middleware for node.js
app.use(morgan("tiny", { stream: logStream }));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// Swagger UI
// Workaround for changing the default URL in swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();
const swaggerIndexContent = fs
  .readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString();

// API Routes
app.use(
  "/v1",
  routesV1({
    apiVersion: "1.0.0",
    apiVersionPath: "v1",
    swaggerIndexContent,
    pathToSwaggerUi
  })
);

// This error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get("port"), app.get("host"), () => {
  logger.info(
    `Server started at http://${app.get("host")}:${app.get("port")}/v1`
  );
});

// Catch unhandled rejections
process.on("unhandledRejection", err => {
  logger.error("Unhandled rejection", err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error("Raven error", err);
  } finally {
    process.exit(1);
  }
});

// Catch uncaught exceptions
process.on("uncaughtException", err => {
  logger.error("Uncaught exception", err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error("Raven error", err);
  } finally {
    process.exit(1);
  }
});

export default app;
