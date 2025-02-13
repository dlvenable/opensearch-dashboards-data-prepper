
interface DataPrepperCluster {
  /**
   * An identifier for the cluster. This is some internal Id to the Dashboards
   * plugin and not related to anything from Data Prepper itself.
   */
  clusterId: string;

  endpoint: string;
}

/**
 * Represents a Data Prepper pipeline as provided by the Data Prepper core
 * server list API.
 */
interface DataPrepperPipeline {
  name: string;
}

interface DataPrepperPipelines {
  pipelines: DataPrepperPipeline[]
}

interface DataPrepperClusterDetails extends DataPrepperPipelines{
  clusterId: string;
  endpoint: string;
}
