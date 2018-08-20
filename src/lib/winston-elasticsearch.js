/* @flow */

import BulkWriter from "./winston-elasticsearch-transformer-bulk-writer";
import Transport from "winston-transport";
import _ from "lodash";
import elasticsearch from "elasticsearch";
import moment from "moment";
import transformer from "./winston-elasticsearch-transformer";

module.exports = class Elasticsearch extends Transport {
  constructor(options: WinstonOptions & WinstonElasticsearchOptions) {
    super(options);

    this.name = "elasticsearch";

    this.defaults = {
      bulkWriterOptions: {
        ensureMappingTemplate: true,
        flushInterval: 2000,
        interval: 5000,
        mappingTemplate: null,
        pipeline: null,
        waitForActiveShards: 1
      },
      elasticsearchOptions: {
        // apiVersion: '6.3',
        // connectionClass: "http",
        // createNodeAgent: () => false,
        // deadTimeout: 60000,
        // defer: () => Bluebird.defer(),
        // host: "http://localhost:9200",
        // hosts: [""],
        // httpAuth: "user:pass",
        // keepAlive: true,
        // keepAliveFreeSocketTimeout: 60000,
        // keepAliveInterval: 1000,
        // keepAliveMaxFreeSockets: 256,
        // log: [
        //   {
        //     level: ["error", "warning"],
        //     type: "stdio"
        //   }
        // ],
        // maxRetries: 3,
        // maxSockets: Infinity,
        // nodesToHostCallback: Function,
        // pingTimeout: 3000,
        // plugins: Function[],
        // requestTimeout: 30000,
        // selector: "roundRobin",
        // sniffInterval: false,
        // sniffOnConnectionFault: false,
        // sniffOnStart: false,
        // sniffedNodesProtocol: "http",
        // ssl: {
        //   ca: null,
        //   cert: null,
        //   ciphers: null,
        //   key: null,
        //   passphrase: null,
        //   pfx: null,
        //   rejectUnauthorized: false,
        //   secureProtocol: null
        // }
        // suggestCompression: false
      },
      // index: null,
      indexPrefix: "logs",
      indexSuffixPattern: "YYYY.MM.DD",
      level: "info",
      levelsMap: {
        debug: "debug",
        error: "error",
        info: "info",
        silly: "debug",
        verbose: "debug",
        warn: "warn"
      },
      transformer,
      type: "_logs"
    };

    this.options = _.defaultsDeep(options, this.defaults);

    this.client = new elasticsearch.Client(this.options.elasticsearchOptions);

    if (options.bulkWriterOptions) {
      const bulkWriterOptions: WinstonBulkWriterOptions = _.defaultsDeep(
        {
          ensureMappingTemplate:
            options.bulkWriterOptions.ensureMappingTemplate,
          flushInterval: options.bulkWriterOptions.flushInterval,
          indexPrefix: options.indexPrefix,
          mappingTemplate: options.bulkWriterOptions.mappingTemplate,
          pipeline: options.bulkWriterOptions.pipeline,
          waitForActiveShards: options.bulkWriterOptions.waitForActiveShards
        },
        this.defaults.bulkWriterOptions
      );

      this.bulkWriter = new BulkWriter(this.client, bulkWriterOptions);

      this.bulkWriter.start();
    }
  }

  /* eslint-disable-next-line flowtype/require-return-type */
  log(info: WinstonInfo, callback: () => void): void {
    let { level }: { level: string } = info;
    const { message }: { message: string } = info;
    let meta: { [string]: any } = {
      ..._.omit(info, ["level", "message", "server_name", "timestamp"])
    };

    level = this.options.levelsMap[level];
    meta = meta || {};

    const entry: WinstonLogTransformered = this.options.transformer({
      level,
      message,
      meta
    });

    let index: string = this.getIndexName(this.options);

    /* eslint-disable-next-line no-undefined */
    if (entry.indexInterfix === undefined || entry.indexInterfix === null) {
      index = this.getIndexName(this.options, entry.indexInterfix);
      delete entry.indexInterfix;
    }

    this.bulkWriter.append(callback, entry, index, this.options.type);

    const setImmediateLoggedHandler: () => void = (): void => {
      this.emit("logged", level);
    };

    setImmediate(setImmediateLoggedHandler);
  }

  getIndexName(
    options: WinstonOptions & WinstonElasticsearchOptions,
    indexInterfix?: string
  ): string {
    this.name = "elasticsearch";

    let { index }: { index?: string } = options;

    /* eslint-disable-next-line no-undefined */
    if (index === undefined || index === null) {
      const { indexPrefix }: { indexPrefix: string } = options;

      const now: moment$Moment = moment();
      const dateString: string = now.format(options.indexSuffixPattern);

      index = `${indexPrefix}${
        /* eslint-disable-next-line no-undefined */
        indexInterfix === undefined || indexInterfix === null
          ? ""
          : `-${indexInterfix}`
      }-${dateString}`;
    }

    return index;
  }
};
