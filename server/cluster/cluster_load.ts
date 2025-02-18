import { IScopedClusterClient } from "opensearch-dashboards/server";

export interface LoadClustersInput {
  openSearchClient: IScopedClusterClient;
}

export interface LoadClusterInput {
  openSearchClient: IScopedClusterClient;
  clusterId: string;
}

interface ClusterDocument {
  endpoint: string;
}


/**
 * Loads Data Prepper clusters from an OpenSearch index.
 *
 * @param input
 */
export async function loadClusters(input: LoadClustersInput): Promise<DataPrepperCluster[]> {
  const opensearchClient = input.openSearchClient;
  const searchResponse = await opensearchClient.asCurrentUser.search<ClusterDocument>(
    {
      index: '.data_prepper_osd',
      body : {
        query: {
          match_all: {}
        },
        size: 20
      }
    }
  );

  const dataPrepperClusters: DataPrepperCluster[] = searchResponse.body.hits.hits.map(document => {
    return {
      clusterId: document._id,
      endpoint: document._source!.endpoint
    }
  }) || [];

  return dataPrepperClusters;
}

/**
 * Loads a single Data Prepper cluster from an OpenSearch index.
 *
 * @param input
 */
export async function loadDataPrepperCluster(input: LoadClusterInput): Promise<DataPrepperCluster> {
  const opensearchClient = input.openSearchClient;
  const getResponse = await opensearchClient.asCurrentUser.get<ClusterDocument>(
    {
      index: '.data_prepper_osd',
      id: input.clusterId
    }
  );

  return {
    clusterId: getResponse.body._id,
    endpoint: getResponse.body._source!.endpoint
  }
}
