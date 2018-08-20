/* @flow */

const LevelWinston = {
  critical: "critical",
  debug: "debug",
  error: "error",
  info: "info",
  log: "log",
  warn: "warn",
  warning: "warning"
}

declare type WinstonLevel = $Keys<typeof LevelWinston>;

declare type WinstonLevelsMap = {
  debug: WinstonLevel,
  error: WinstonLevel,
  info: WinstonLevel,
  silly: WinstonLevel,
  verbose: WinstonLevel,
  warn: WinstonLevel
};
