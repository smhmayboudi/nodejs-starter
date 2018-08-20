/* @flow */

declare type AutoBreadcrumbOptions = {
  console?: boolean,
  dom?: boolean,
  location?: boolean,
  sentry?: boolean,
  xhr?: boolean
};

declare type RavenInstrumentationOptions = {
  tryCatch?: boolean
};

const LogLevelRaven = {
  critical: "critical",
  debug: "debug",
  error: "error",
  info: "info",
  log: "log",
  warn: "warn",
  warning: "warning"
};

declare type RavenLogLevel = $Keys<typeof LogLevelRaven>;

declare type RavenOptions = {
  allowDuplicates?: boolean,
  allowSecretKey?: boolean,
  autoBreadcrumbs?: boolean | AutoBreadcrumbOptions,
  breadcrumbCallback?: (data: any) => any,
  // EXTRA
  ca?: string,
  captureUnhandledRejections?: boolean,
  dataCallback?: (data: any) => any,
  debug?: boolean,
  environment?: string,
  extra?: any,
  fetchParameters?: { [string]: string } | Function,
  fingerprint?: string[],
  headers?: { [string]: string } | Function,
  ignoreErrors?: (RegExp | string)[],
  ignoreUrls?: (RegExp | string)[],
  includePaths?: (RegExp | string)[],
  instrument?: boolean | RavenInstrumentationOptions,
  level?: RavenLogLevel,
  logger?: string,
  maxBreadcrumbs?: number,
  maxMessageLength?: number,
  // EXTRA
  maxReqQueueCount?: number,
  maxUrlLength?: number,
  name?: string,
  // EXTRA
  parseUser?: boolean | string[] | ((req: any) => any),
  release?: string,
  // EXTRA
  root?: string,
  sampleRate?: number,
  sanitizeKeys?: (RegExp | string)[],
  // EXTRA
  sendTimeout?: number,
  serverName?: string,
  shouldSendCallback?: (data: any) => boolean,
  stacktrace?: boolean,
  tags?: { [string]: string },
  transport?: (options: {
    auth: {
      sentry_client: string,
      sentry_key: string,
      sentry_version: string
    },
    data: any,
    onError: (error: Error & { request?: XMLHttpRequest }) => void,
    onSuccess: () => void,
    url: string
  }) => void,
  whitelistUrls?: (RegExp | string)[]
};
