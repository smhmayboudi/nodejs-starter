/* @flow */

declare type WinstonElasticsearchOptions = {
  bulkWriterOptions?: WinstonBulkWriterOptions,
  elasticsearchOptions: ElasticsearchOptions,
  index?: string,
  indexPrefix: string,
  indexSuffixPattern: string,
  levelsMap?: WinstonLevelsMap,
  transformer?: (log: WinstonLog) => WinstonLogTransformered,
  type: string
};
