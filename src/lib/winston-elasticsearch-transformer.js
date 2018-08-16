/* @flow */

const transformer: (log: WinstonLog) => WinstonLogTransformered = (
  log: WinstonLog
): WinstonLogTransformered => ({
  "@timestamp":
    log.timestamp === null || log.timestamp === ""
      ? log.timestamp
      : new Date().toISOString(),
  fields: log.meta,
  message: log.message,
  severity: log.level
});

export default transformer;
