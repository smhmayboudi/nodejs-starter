/* @flow */

import { app, server } from "./express";
import Prometheus from "prom-client";
import logger from "./winston";

const metricsInterval: IntervalID = Prometheus.collectDefaultMetrics();
const checkoutsTotal: Prometheus.Counter = new Prometheus.Counter({
  help: "Total number of checkouts",
  labelNames: ["payment_method"],
  name: "checkouts_total"
});
const httpRequestDurationMicroseconds: Prometheus.Histogram = new Prometheus.Histogram(
  {
    // buckets for response time from 0.1ms to 500ms
    /* eslint-disable-next-line no-magic-numbers */
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    name: "http_request_duration_ms"
  }
);

const newLocal1: (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  /* $FlowFixMe */
  res.locals.startEpoch = Date.now();
  next();
};

// Runs before each requests
app.use(newLocal1);

const newLocal2: (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  const timeoutHandler: () => void = (): void => {
    /* $FlowFixMe */
    res.json({ message: "Hello World!" });
    next();
  };

  const timeout: number = 200;

  setTimeout(timeoutHandler, Math.round(Math.random() * timeout));
};

app.get("/", newLocal2);

const newLocal3: (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  next(new Error("My Error"));
};

app.get("/bad", newLocal3);

const newLocal4: (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  const zero: number = 0;
  const paymentMethod: string =
    Math.round(Math.random()) === zero ? "stripe" : "paypal";

  checkoutsTotal.inc({
    /* eslint-disable-next-line camelcase */
    payment_method: paymentMethod
  });
  /* $FlowFixMe */
  res.json({ status: "ok" });
  next();
};

app.get("/checkout", newLocal4);

const newLocal5: (
  req: http$IncomingMessage,
  res: http$ServerResponse
) => void = (req: http$IncomingMessage, res: http$ServerResponse): void => {
  /* $FlowFixMe */
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
};

app.get("/metrics", newLocal5);

const newLocal6: (
  err: Error,
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  err: Error,
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  res.statusCode = 500;
  /* $FlowFixMe */
  res.json({ error: err.message });
  next();
};

// Error handler
app.use(newLocal6);

const newLocal7: (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
) => void = (
  req: http$IncomingMessage,
  res: http$ServerResponse,
  next: express$NextFunction
): void => {
  /* $FlowFixMe */
  const responseTimeInMs: number = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    /* $FlowFixMe */
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs);
  next();
};

// Runs after each requests
app.use(newLocal7);

const sigtermHandler: () => void = (): void => {
  clearInterval(metricsInterval);
  const closeHandler: (err: Error) => void = (err: Error): void => {
    if (err) {
      logger.error(err);

      const code: number = 1;

      /* eslint-disable-next-line no-process-exit */
      process.exit(code);
    } else {
      const code: number = 0;

      /* eslint-disable-next-line no-process-exit */
      process.exit(code);
    }
  };

  server.close(closeHandler);
};

// Graceful shutdown
process.on("SIGTERM", sigtermHandler);
