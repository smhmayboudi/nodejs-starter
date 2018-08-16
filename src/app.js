/* @flow */

/* eslint-disable-next-line no-unused-vars */
import { env, kubernetesProbs, winston as logger } from "./config";

const doHomework: (
  subject: string,
  callback: (subject: string) => void
) => void = (subject: string, callback: (subject: string) => void) => {
  logger.info(`Starting my ${subject} homework.`);
  callback(subject);
};
const doneHomework: (subject: string) => void = (subject: string) => {
  logger.info(`Finished my ${subject} homework.`);
};

doHomework("math", doneHomework);
