import { IRouter } from '../../../../src/core/server';
import { schema } from "@osd/config-schema";

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
      return response.ok({
        body: {
          cluster:
            {
              clusterId: 'cluster1',
              endpoint: 'http://localhost:4900'
            }
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
}
