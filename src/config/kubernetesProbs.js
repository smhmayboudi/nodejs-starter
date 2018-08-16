/* @flow */

import { app } from "./express";

const livenessHandler: (req: express$Request, res: express$Response) => void = (
  req: express$Request,
  res: express$Response
): void => {
  const statusCodeOK: number = 200;

  res.sendStatus(statusCodeOK);
};

let readiness: boolean = false;

const readinessTestHandler: () => void = (): void => {
  readiness = true;
};
const readinessTestHandlerTimeout: number = 2000;

setTimeout(readinessTestHandler, readinessTestHandlerTimeout);

const readinessHandler: (
  req: express$Request,
  res: express$Response
) => void = (req: express$Request, res: express$Response): void => {
  if (readiness) {
    const statusCodeOK: number = 200;

    res.sendStatus(statusCodeOK);
  } else {
    const statusCodeServiceUnavailable: number = 503;

    res.sendStatus(statusCodeServiceUnavailable);
  }
};

app.get("/liveness", livenessHandler);

app.get("/readiness", readinessHandler);
