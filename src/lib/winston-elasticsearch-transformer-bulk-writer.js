/* @flow */

import createDebug from "debug";
import elasticsearch from "elasticsearch";
import fs from "fs";
import path from "path";
import retry from "retry";

const debug: createDebug.Debugger = createDebug("winston:elasticsearch");

const BulkWriter: (
  client: elasticsearch.Client,
  options: WinstonBulkWriterOptions
) => void =
  /* eslint-disable-next-line flowtype/require-return-type */
  function BulkWriter(
    client: elasticsearch.Client,
    options: WinstonBulkWriterOptions
  ): void {
    this.client = client;
    this.interval = options.interval;
    this.options = options;
    this.pipeline = options.pipeline;
    this.waitForActiveShards = options.waitForActiveShards;

    // bulk to be flushed
    this.bulk = [];
    this.running = false;
    this.timer = false;
    debug("created", this);
  };

BulkWriter.prototype.start = function start() {
  this.checkEsConnection();
  this.running = true;
  this.tick();
  debug("started");
};

BulkWriter.prototype.stop = function stop() {
  this.running = false;
  if (!this.timer) {
    return;
  }
  clearTimeout(this.timer);
  this.timer = null;
  debug("stopped");
};

BulkWriter.prototype.schedule = function schedule() {
  const that: BulkWriter = this;

  const setTimeoutHandler: () => void = (): void => {
    that.tick();
  };

  this.timer = setTimeout(setTimeoutHandler, this.interval);
};

BulkWriter.prototype.tick = function tick() {
  debug("tick");
  const that: BulkWriter = this;

  if (!this.running) {
    return;
  }
  const flushThenHandler: () => void = (): void => {
    // Emulate finally with last .then()
  };
  const flushFinallyHandler: () => void = (): void => {
    // finally()
    that.schedule();
  };

  this.flush()
    .then(flushThenHandler)
    .then(flushFinallyHandler);
};

BulkWriter.prototype.flush = function flush(): Promise<any> {
  // write bulk to elasticsearch
  const that: BulkWriter = this;

  /* eslint-disable-next-line no-magic-numbers */
  if (this.bulk.length === 0) {
    debug("nothing to flush");

    return new Promise((resolve: () => void) => resolve());
  }
  const bulk: {
    callback: () => void,
    doc: any,
    index: string,
    type: string
  }[] = this.bulk.concat();

  this.bulk = [];
  const body: { [string]: any }[] = [];

  const bulksEachHandler: ({
    doc: any,
    index: string,
    type: string
  }) => void = ({
    index,
    type,
    doc
  }: {
    doc: any,
    index: string,
    type: string
  }): void => {
    body.push(
      { index: { _index: index, _type: type, pipeline: that.pipeline } },
      doc
    );
  };

  bulk.forEach(bulksEachHandler);
  debug("going to write", body);

  const bulkHandler: (res: {
    errors: any,
    items: { index: { error: any } }[]
  }) => void = (res: {
    errors: any,
    items: { index: { error: any } }[]
  }): void => {
    if (res.errors && res.items) {
      const itemsEachHandler: (item: {
        index: { error: any }
      }) => void = (item: { index: { error: any } }): void => {
        if (item.index && item.index.error) {
          // eslint-disable-next-line no-console
          console.error("Elasticsearch index error", item.index);
        }
      };

      res.items.forEach(itemsEachHandler);
    }
    const bulksEachHandler2: ({ callback: () => void }) => void = ({
      callback
    }: {
      callback: () => void
    }): void => callback && callback();

    bulk.forEach(bulksEachHandler2);
  };

  const bulkCatchHandler: (err: Error) => void = (err: Error): void => {
    // prevent [DEP0018] DeprecationWarning
    // rollback this.bulk array
    that.bulk = bulk.concat(that.bulk);
    // eslint-disable-next-line no-console
    console.error(err);
    debug("error occurred", err);
    that.stop();
    that.checkEsConnection();
  };

  return this.client
    .bulk({
      body,
      timeout: `${this.interval}ms`,
      type: this.type,
      waitForActiveShards: this.waitForActiveShards
    })
    .then(bulkHandler)
    .catch(bulkCatchHandler);
};

BulkWriter.prototype.append = function append(
  callback: () => void,
  doc: any,
  index: string,
  type: string
) {
  this.bulk.push({
    callback,
    doc,
    index,
    type
  });
};

BulkWriter.prototype.checkEsConnection = function checkEsConnection(): Promise<
  any
> {
  const that: BulkWriter = this;

  that.esConnection = false;

  const operation: retry.operation = retry.operation({
    factor: 1,
    forever: true,
    maxTimeout: 60000,
    minTimeout: 1000,
    randomize: false,
    retries: 1
  });

  return new Promise(
    (resolve: (value?: any) => void, reject: (reason?: any) => void) => {
      const attemptHandler: (currentAttempt: number) => void = (
        currentAttempt: number
      ): void => {
        debug("checking for connection", currentAttempt);
        const pingHandler: (res: any) => void = (res: any): void => {
          that.esConnection = true;
          // Ensure mapping template is existing if desired
          if (that.options.ensureMappingTemplate) {
            that.ensureMappingTemplate(resolve, reject);
          } else {
            resolve(true);
          }
          debug("starting bulk writer");
          that.running = true;
          that.tick();
        };

        const pingCatchHandler: (err: Error) => void = (err: Error): void => {
          debug("checking for connection");
          if (operation.retry(err)) {
            return;
          }
          // that.esConnection = false;
          reject(new Error("Cannot connect"));
        };

        that.client.ping().then(pingHandler, pingCatchHandler);
      };

      operation.attempt(attemptHandler);
    }
  );
};

BulkWriter.prototype.ensureMappingTemplate = function ensureMappingTemplate(
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
) {
  const that: BulkWriter = this;
  let { mappingTemplate }: { mappingTemplate: any } = that.options;

  if (mappingTemplate === null || typeof mappingTemplate === "undefined") {
    const rawdata: string = fs.readFileSync(
      path.join(__dirname, "winston-elasticsearch-index-template-mapping.json"),
      "utf8"
    );

    mappingTemplate = JSON.parse(rawdata);
  }
  const tmplCheckMessage: { name: string } = {
    name: `template_${
      typeof that.options.indexPrefix === "function"
        ? that.options.indexPrefix()
        : that.options.indexPrefix
    }`
  };

  const getTemplateHandler: (res: any) => void = (res: any): void => {
    resolve(res);
  };
  const getTemplateCatchHandler: (err: Error & { status: number }) => void = (
    err: Error & { status: number }
  ): void => {
    const errorStatus: number = 404;

    /* eslint-disable-next-line no-undefined */
    if (err.status !== undefined && err.status === errorStatus) {
      const tmplMessage: { name: string } = {
        body: mappingTemplate,
        create: true,
        name: `template_${
          typeof that.options.indexPrefix === "function"
            ? that.options.indexPrefix()
            : that.options.indexPrefix
        }`
      };

      const putTemplateHandler: (res2: any) => void = (res2: any): void => {
        resolve(res2);
      };

      const putTemplateCatchHandler: (err2: Error) => void = (
        err2: Error
      ): void => {
        reject(err2);
      };

      that.client.indices
        .putTemplate(tmplMessage)
        .then(putTemplateHandler, putTemplateCatchHandler);
    }
  };

  that.client.indices
    .getTemplate(tmplCheckMessage)
    .then(getTemplateHandler, getTemplateCatchHandler);
};

module.exports = BulkWriter;
