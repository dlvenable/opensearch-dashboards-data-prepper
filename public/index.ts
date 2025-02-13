import './index.scss';

import { DataPrepperPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new DataPrepperPlugin();
}
export { DataPrepperPluginSetup, DataPrepperPluginStart } from './types';
