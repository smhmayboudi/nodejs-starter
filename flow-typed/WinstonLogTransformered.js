/* @flow */

declare type WinstonLogTransformered = {
  "@timestamp": string,
  fields: any,
  indexInterfix?: string,
  message: string,
  severity: string
};
