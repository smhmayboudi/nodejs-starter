/* @flow */

declare type ElasticsearchLogLevel =
  | "debug"
  | "error"
  | "info"
  | "trace"
  | "warning";

declare type ElasticsearchLogType = "console" | "stdio";

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
