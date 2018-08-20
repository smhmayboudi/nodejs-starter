/* @flow */

import Raven from "raven";
import Transport from "winston-transport";
import _ from "lodash";

module.exports = class Sentry extends Transport {
  constructor(options: WinstonOptions & WinstonSentryOptions) {
    super(options);

    this.name = "sentry";

    this.defaults = {
      dsn: "",
      levelsMap: {
        debug: "debug",
        error: "error",
        info: "info",
        silly: "debug",
        verbose: "debug",
        warn: "warn"
      },
      ravenOptions: {
        // allowDuplicates: false,
        // allowSecretKey: false,
        // autoBreadcrumbs: true,
        // breadcrumbCallback(crumb: any): any {
        //   if (crumb.type === "http") {
        //     return crumb;
        //   }
        //   return false;
        // },
        // ca: "",
        // captureUnhandledRejections: false,
        // dataCallback(data: any): any {
        //   // do something to data
        //   return data;
        // },
        // debug: false,
        // environment: "",
        // extra: {},
        // fetchParameters: {},
        // fingerprint: {},
        // headers: {},
        // ignoreErrors: [],
        // ignoreUrls: [],
        // includePaths: [],
        // instrument: false,
        // level: "",
        logger: "winston-sentry"
        // maxBreadcrumbs: 30,
        // maxMessageLength: 0,
        // maxReqQueueCount: 0,
        // maxUrlLength: 250,
        // name: "",
        // parseUser: null,
        // release: "",
        // sampleRate: 1,
        // sanitizeKeys: [],
        // sendTimeout: 0,
        // serverName: "",
        // shouldSendCallback(data: any): boolean {
        //   return false;
        // },
        // stacktrace: false,
        // tags: {},
        // transport(options: {
        //   auth: {
        //     sentry_client: string,
        //     sentry_key: string,
        //     sentry_version: string
        //   },
        //   data: any,
        //   onError: (error: Error & { request?: XMLHttpRequest }) => void,
        //   onSuccess: () => void,
        //   url: string
        // }): void {},
        // whitelistUrls: []
      }
    };

    this.options = _.defaultsDeep(options, this.defaults);

    Raven.config(this.options.dsn || false, this.options.ravenOptions);

    // Exception handling will done by winston
    // Raven.install();

    /* eslint-disable-next-line handle-callback-err */
    const errorHandler: (err: Error) => void = (err: Error): void => {
      const setImmediateHandler: () => void = (): void => {
        // The event contains information about the failure:
        //   err.reason -- raw response body
        //   err.statusCode -- response status code
        //   err.response -- raw http response object
        this.emit("error", err);
      };

      setImmediate(setImmediateHandler);
    };

    Raven.on("error", errorHandler);
  }

  log(info: WinstonInfo, callback: () => void): void {
    let { level }: { level: string } = info;
    const { message }: { message: string } = info;
    let meta: { [string]: any } = {
      ..._.omit(info, ["level", "message", "server_name", "timestamp"])
    };

    level = this.options.levelsMap[level];
    meta = meta || {};

    const extraData: { [string]: any } = _.extend({}, meta);

    const { tags }: { [string]: any } = extraData;

    delete extraData.tags;

    const extra: { [string]: any } = {
      extra: extraData,
      level,
      tags
    };

    if (extraData.request) {
      extra.request = extraData.request;
      delete extraData.request;
    }

    if (extraData.user) {
      extra.user = extraData.user;
      delete extraData.user;
    }

    const ravenHandler: (err: Error, eventId: number) => void = (
      err: Error,
      /* eslint-disable-next-line no-unused-vars */
      eventId: number
    ): void => {
      if (err) {
        const setImmediateErrorHandler: () => void = (): void => {
          this.emit("error", err);
        };

        setImmediate(setImmediateErrorHandler);

        return callback && callback();
      }

      const setImmediateLoggedHandler: () => void = (): void => {
        this.emit("logged", level);
      };

      setImmediate(setImmediateLoggedHandler);

      return callback && callback();
    };

    try {
      if (level === "error") {
        if (meta instanceof Error) {
          meta.message =
            message === "" ? "" : `${message}. cause: ${meta.message}`;
          Raven.captureException(meta, extra, ravenHandler);
        }
      } else {
        Raven.captureMessage(message, extra, ravenHandler);
      }
    } catch (err) {
      const setImmediateErrorHandler: () => void = (): void => {
        this.emit("error", err);
      };

      setImmediate(setImmediateErrorHandler);

      return callback && callback();
    }
  }
};
