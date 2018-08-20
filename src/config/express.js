/* @flow */

import env from "./env";
import express from "express";
import expressWinston from "express-winston";
import logger from "./winston";

const app: express$Application = express();

app.set("host", env.HOST);
app.set("port", env.PORT);

app.use(
  expressWinston.logger({
    /* eslint-disable-next-line no-unused-vars */
    ignoreRoute(req: express$Request, res: express$Response): boolean {
      return req.url === "/metrics";
    },
    winstonInstance: logger
    // transports: [<WinstonTransport>], // list of all winston transports instances to use.
    // winstonInstance: <WinstonLogger>, // a winston logger instance. If this is provided the transports option is ignored.
    // level: String or function(req, res) { return String; }, // log level to use, the default is "info". Assign a  function to dynamically set the level based on request and response, or a string to statically set it always at that level. statusLevels must be false for this setting to be used.
    // msg: String or function // customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", "HTTP {{req.method}} {{req.url}}" or function(req, res) { return `${res.statusCode} - ${req.method}` }
    // expressFormat: Boolean, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors when colorize set to true
    // colorize: Boolean, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    // meta: Boolean, // control whether you want to log the meta data about the request (default to true).
    // baseMeta: Object, // default meta data to be added to log, this will be merged with the meta data.
    // metaField: String, // if defined, the meta data will be added in this field instead of the meta root object.
    // statusLevels: Boolean or Object // different HTTP status codes caused log messages to be logged at different levels (info/warn/error), the default is false. Use an object to control the levels various status codes are logged at. Using an object for statusLevels overrides any setting of options.level.
    // ignoreRoute: function (req, res) { return false; } // A function to determine if logging is skipped, defaults to returning false. Called _before_ any later middleware.
    // skip: function(req, res) { return false; } // A function to determine if logging is skipped, defaults to returning false. Called _after_ response has already been sent.
    // requestFilter: function (req, propName) { return req[propName]; } // A function to filter/return request values, defaults to returning all values allowed by whitelist. If the function returns undefined, the key/value will not be included in the meta.
    // responseFilter: function (res, propName) { return res[propName]; } // A function to filter/return response values, defaults to returning all values allowed by whitelist. If the function returns undefined, the key/value will not be included in the meta.
    // requestWhitelist: [String] // Array of request properties to log. Overrides global requestWhitelist for this instance
    // responseWhitelist: [String] // Array of response properties to log. Overrides global responseWhitelist for this instance
    // bodyWhitelist: [String] // Array of body properties to log. Overrides global bodyWhitelist for this instance
    // bodyBlacklist: [String] // Array of body properties to omit from logs. Overrides global bodyBlacklist for this instance
    // ignoredRoutes: [String] // Array of paths to ignore/skip logging. Overrides global ignoredRoutes for this instance
    // dynamicMeta: function(req, res) { return [Object]; } // Extract additional meta data from request or response (typically req.user data if using passport). meta must be true for this function to be activated
  })
);

const listenHandler: () => void = (): void => {
  logger.info(`Express server listening at http://${env.HOST}:${env.PORT}`);
};

const server: Server = app.listen(env.PORT, listenHandler);

export { app, server };
