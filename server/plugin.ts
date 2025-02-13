import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { DataPrepperPluginSetup, DataPrepperPluginStart } from './types';
import { defineRoutes } from './routes';

export class DataPrepperPlugin implements Plugin<DataPrepperPluginSetup, DataPrepperPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('data_prepper: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('data_prepper: Started');
    return {};
  }

  public stop() {}
}
