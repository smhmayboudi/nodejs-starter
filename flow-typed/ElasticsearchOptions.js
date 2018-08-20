/* @flow */

const LogLevel = {
  debug: "debug",
  error: "error",
  info: "info",
  trace: "trace",
  warning: "warning"
};

declare type ElasticsearchLogLevel = $Keys<typeof LogLevel>;

const LogType = {
  console: "console",
  stdio: "stdio",
};

declare type ElasticsearchLogType = $Keys<typeof LogType>;

declare type ElasticsearchOptions = {
  apiVersion?: string,
  connectionClass?: string, // | typeof HttpConnector,
  createNodeAgent?: () => boolean,
  deadTimeout?: number,
  defer?: () => void,
  host?: string,
  hosts?: string[],
  httpAuth?: string,
  keepAlive?: boolean,
  keepAliveFreeSocketTimeout?: number,
  keepAliveInterval?: number,
  keepAliveMaxFreeSockets?: number,
  log?: [
    {
      level: ElasticsearchLogLevel[],
      type: ElasticsearchLogType
    }
  ],
  maxRetries?: number,
  maxSockets?: number,
  nodesToHostCallback?: Function,
  pingTimeout?: number,
  plugins?: Function[],
  requestTimeout?: number,
  selector?: string | Function,
  sniffInterval?: number,
  sniffOnConnectionFault?: boolean,
  sniffOnStart?: boolean,
  sniffedNodesProtocol?: string,
  ssl?: {
    ca?: string | string[],
    cert?: string,
    ciphers?: string,
    key?: string,
    passphrase?: string,
    pfx?: string | string[],
    rejectUnauthorized?: boolean,
    secureProtocol?: string
  },
  suggestCompression?: boolean
};
