/* @flow */

import { Logger, createLogger, format, transports } from "winston";
import Elasticsearch from "../lib/winston-elasticsearch";
import Sentry from "../lib/winston-sentry";
import _ from "lodash";
import env from "./env";

const { combine, printf }: { combine: format, printf: format } = format;

const { Console }: { Console: transports.Console } = transports;

const logger: Logger = createLogger({
  exitOnError: false
});

const levelsMap: WinstonLevelsMap = {
  debug: "debug",
  error: "error",
  info: "info",
  silly: "debug",
  verbose: "debug",
  warn: "warning"
};

if (env.LOG_CONSOLE) {
  const formatHandler: (
    info: { [string]: any },
    options: { [string]: any }
  ) => { [string]: any } = (
    info: { [string]: any },
    /* eslint-disable-next-line no-unused-vars */
    options: { [string]: any }
  ): { [string]: any } => {
    info.timestamp = new Date().toISOString();
    info.level = levelsMap[info.level].toUpperCase();
    /* eslint-disable-next-line camelcase */
    info.server_name = env.SENTRY_NAME;

    const meta: { [string]: any } = {
      ..._.omit(info, ["level", "message", "server_name", "timestamp"])
    };

    info.meta = JSON.stringify(meta);
    if (info.meta === "{}") {
      info.meta = "";
    } else {
      info.meta = ` \n${info.meta}`;
    }

    return info;
  };

  const printfHandler: (info: { [string]: any }) => string = (info: {
    [string]: any
  }): string =>
    `[${info.timestamp}] ${info.level}: ${
      info.server_name
    } (FILE_PATH:LINE_NUMBER in Moddule.Function) ${info.message}${info.meta}`;

  logger.add(
    new Console({
      format: combine(format(formatHandler)(), printf(printfHandler)),
      handleExceptions: false
    })
  );
}

if (env.LOG_ELASTICSEARCH) {
  logger.add(
    new Elasticsearch({
      elasticsearchOptions: {
        host: env.ELASTICSEARCH_HOST
      },
      handleExceptions: false,
      indexPrefix: env.ELASTICSEARCH_INDEXPREFIX,
      indexSuffixPattern: env.ELASTICSEARCH_INDEXSUFFIXPATTERN,
      level: (env.LOG_ELASTICSEARCH_LEVEL: any),
      levelsMap,
      type: env.ELASTICSEARCH_TYPE
    })
  );
}

if (env.LOG_SENTRY) {
  logger.add(
    new Sentry({
      dsn: env.SENTRY_DSN,
      handleExceptions: true,
      level: (env.LOG_SENTRY_LEVEL: any),
      levelsMap
    })
  );
}

logger.emitErrs = false;
// /* eslint-disable-next-line handle-callback-err */
// const errorHandler: (err: Error) => void = (err: Error): void => {
// };
// logger.on("error", errorHandler);

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  /* eslint-disable-next-line no-unused-vars */
  write(message: string, encoding: string) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

export default logger;
