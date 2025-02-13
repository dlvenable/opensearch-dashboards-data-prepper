import React, { useEffect, useState } from "react";
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';

import {
  EuiBasicTable, EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent, EuiPageContentBody, EuiPageHeader,
  EuiText,
  EuiTitle
} from "@elastic/eui";
import { useParams } from "react-router-dom";
import { DataPrepperAppDeps } from "./app";

export const ClusterPage: React.FC<DataPrepperAppDeps> = ({
                                                            http,
                                                            notifications
                                                          }) => {

  const {clusterId} = useParams<{ clusterId: string }>();

  const [cluster, setCluster] = useState<DataPrepperClusterDetails | undefined>();

  const onShutdownClickHandler = () => {
    http.post(`/api/data_prepper/clusters/${clusterId}/shutdown`).then((res) => {
      setCluster(res.cluster);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('dataPrepper.shutdownCluster', {
          defaultMessage: 'Data Prepper shutdown',
        })
      );
    })
      .catch(() => {
        notifications.toasts.addDanger(
          i18n.translate('dataPrepper.shutdownCluster', {
            defaultMessage: 'Failed to shutdown',
          })
        );
      });
  };


  useEffect(() => {
    const getCluster = async () => {
      http.get(`/api/data_prepper/clusters/${clusterId}`).then((res) => {
        setCluster(res.cluster);
        // Use the core notifications service to display a success message.
        notifications.toasts.addSuccess(
          i18n.translate('dataPrepper.getCluster', {
            defaultMessage: 'Data updated',
          })
        );
      })
        .catch(() => {
          notifications.toasts.addDanger(
            i18n.translate('dataPrepper.getCluster', {
              defaultMessage: 'Failed to update',
            })
          );
        });
    };

    getCluster();
  }, []);

  const pipelineColumns = [
    {field: 'name', name: 'Name'}
  ];


  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (

    <EuiPage restrictWidth="1000px">
      <EuiPageBody component="main">
        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>
              <FormattedMessage
                id="dataPrepper.helloWorldText"
                defaultMessage="{name}"
                values={{name: cluster?.endpoint}}
              />
            </h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody>
            <EuiText>
              <p>
                <FormattedMessage
                  id="dataPrepper.nameText"
                  defaultMessage="Cluster Id: {id}"
                  values={{id: cluster ? cluster.clusterId : 'No Id'}}
                />
              </p>
            </EuiText>
            <EuiHorizontalRule/>
            <EuiBasicTable items={cluster ? cluster.pipelines : []} columns={pipelineColumns}/>
            <EuiButton type="primary" size="s" onClick={onShutdownClickHandler}>
              <FormattedMessage
                id="dataPrepper.buttonText"
                defaultMessage="Shutdown Cluster"
              />
            </EuiButton>

          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
