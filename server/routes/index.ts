import { IRouter } from '../../../../src/core/server';
import { schema } from "@osd/config-schema";
import * as http from 'http';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/data_prepper/clusters',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          clusters: [
            {
              clusterId: 'cluster1',
              endpoint: 'http://localhost:4900'
            }
          ]
        },
      });
    }
  );

  router.get(
    {
      path: '/api/data_prepper/clusters/{clusterId}',
      validate: {
        params: schema.object({
          clusterId: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      const endpoint = 'http://localhost:4900';
      const pipelines = await getPipelines(endpoint);
      return response.ok({
        body: {
          cluster:
            {
              clusterId: 'cluster1',
              endpoint: endpoint,
              ...pipelines
            }
        },
      });
    }
  );

  router.post(
    {
      path: '/api/data_prepper/clusters/{clusterId}/shutdown',
      validate: {
        params: schema.object({
          clusterId: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      const endpoint = 'http://localhost:4900';
      await shutdownPipelines(endpoint);
      return response.ok({
        body: {
        },
      });
    }
  );

  /*
  router.post(
    {
      path: '/api/data_prepper/clusters',
      validate: {
        body: schema.object({
          endpoint: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          endpoint: '',
        },
      });
    }
  );

   */


  async function getPipelines(endpoint: string) {
    try {
      const body = await httpRequest(endpoint + '/list');

      return JSON.parse(body) as DataPrepperPipelines;
    } catch (error) {
      console.error('GET Request Error:', error.message);
      throw error;
    }
  }

  async function shutdownPipelines(endpoint: string) {
    try {
      await httpRequest(endpoint + '/shutdown', 'POST');
    } catch (error) {
      console.error('GET Request Error:', error.message);
      throw error;
    }
  }

  async function httpRequest(url: string, method: string = 'GET'): Promise<string> {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);

      const requestOptions: http.RequestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: method
      };

      const req = http.request(requestOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`Request failed with status code: ${res.statusCode}, message: ${data}`));
          }
        });
      }).on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }
}
