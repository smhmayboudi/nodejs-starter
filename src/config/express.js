/* @flow */

import type { Server } from "http";

import env from "./env";
import express from "express";
import logger from "./winston";
import morgan from "morgan";

const app: express$Application = express();

app.set("host", env.HOST);
app.set("port", env.PORT);

app.use(morgan("dev", { stream: logger.stream }));

const listenHandler: () => void = (): void => {
  logger.info(`Express server listening at http://${env.HOST}:${env.PORT}`);
};

const server: Server = app.listen(env.PORT, listenHandler);

export { app, server };
