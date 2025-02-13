import { PluginInitializerContext } from '../../../src/core/server';
import { DataPrepperPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new DataPrepperPlugin(initializerContext);
}

export { DataPrepperPluginSetup, DataPrepperPluginStart } from './types';
