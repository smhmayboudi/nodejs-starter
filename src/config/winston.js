/* @flow */

/* $FlowFixMe */
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
    info: WinstonTransformableInfo,
    options: { [string]: any }
  ) => WinstonTransformableInfo = (
    info: WinstonTransformableInfo,
    /* eslint-disable-next-line no-unused-vars */
    options: { [string]: any }
  ): WinstonTransformableInfo => {
    info.timestamp = new Date().toISOString();
    info.level = levelsMap[info.level].toUpperCase();
    /* eslint-disable-next-line camelcase */
    info.server_name = env.SENTRY_NAME;

    const meta: { [string]: any } = {
      ..._.omit(info, ["level", "message", "server_name", "timestamp"])
    };

    const metaStringify: string = JSON.stringify(meta);

    info.meta = metaStringify === "{}" ? "" : ` \n${metaStringify}`;

    return info;
  };

  const printfHandler: (info: { [string]: any }) => string = (info: {
    [string]: any
  }): string =>
    `[${info.timestamp}] ${info.level}: ${info.server_name} ${info.message}${
      info.meta
    }`;

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

export default logger;
