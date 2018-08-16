/* @flow */

/* eslint no-process-env: "off" */

const ELASTICSEARCH_HOST: string = process.env.ELASTICSEARCH_HOST || "";
const ELASTICSEARCH_INDEXPREFIX: string =
  process.env.ELASTICSEARCH_INDEXPREFIX || "";
const ELASTICSEARCH_INDEXSUFFIXPATTERN: string =
  process.env.ELASTICSEARCH_INDEXSUFFIXPATTERN || "";
const ELASTICSEARCH_TYPE: string = process.env.ELASTICSEARCH_TYPE || "";
const HOST: string = process.env.HOST || "";
const LOG_CONSOLE: boolean = process.env.LOG_CONSOLE === "true" || true;
const LOG_CONSOLE_LEVEL: string = process.env.LOG_CONSOLE_LEVEL || "";
const LOG_ELASTICSEARCH: boolean =
  process.env.LOG_ELASTICSEARCH === "true" || false;
const LOG_ELASTICSEARCH_LEVEL: string =
  process.env.LOG_ELASTICSEARCH_LEVEL || "";
const LOG_LEVEL: string = process.env.LOG_LEVEL || "";
const LOG_SENTRY: boolean = process.env.LOG_SENTRY === "true" || false;
const LOG_SENTRY_LEVEL: string = process.env.LOG_SENTRY_LEVEL || "";
const NODE_ENV: string = process.env.NODE_ENV || "";
const PORT: string = process.env.PORT || "";
const SENTRY_DSN: string = process.env.SENTRY_DSN || "";
const SENTRY_NAME: string = process.env.SENTRY_NAME || "";
const SENTRY_RELEASE: string = process.env.SENTRY_RELEASE || "";

const development: string = "development";

export default {
  ELASTICSEARCH_HOST,
  ELASTICSEARCH_INDEXPREFIX,
  ELASTICSEARCH_INDEXSUFFIXPATTERN,
  ELASTICSEARCH_TYPE,
  HOST,
  LOG_CONSOLE,
  LOG_CONSOLE_LEVEL,
  LOG_ELASTICSEARCH,
  LOG_ELASTICSEARCH_LEVEL,
  LOG_LEVEL,
  LOG_SENTRY,
  LOG_SENTRY_LEVEL,
  NODE_ENV,
  PORT,
  SENTRY_DSN,
  SENTRY_NAME,
  SENTRY_RELEASE,
  development
};
