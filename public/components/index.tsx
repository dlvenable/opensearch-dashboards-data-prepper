import React, { useState } from "react";
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';

import {
  EuiBasicTable, EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent, EuiPageContentBody, EuiPageContentHeader,
  EuiPageHeader,
  EuiText,
  EuiTitle
} from "@elastic/eui";
import { Link } from "react-router-dom";
import { PLUGIN_NAME } from "../../common";
import { DataPrepperAppDeps } from "./app";

export const DataPrepperIndex: React.FC<DataPrepperAppDeps> = ({
  http,
  notifications
}) => {


  const [clusters, setClusters] = useState<DataPrepperCluster[]>([]);


  const onClickHandler = () => {
    http.get('/api/data_prepper/clusters').then((res) => {
      setClusters(res.clusters);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('dataPrepper.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };


  const columns = [
    {field: 'endpoint', name: 'Endpoint'},
    {
      name: 'Details',
      render: (cluster: DataPrepperCluster) => (
        <Link to={`/clusters/${cluster.clusterId}`}>View Details</Link>
      ),
    },
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
                values={{name: PLUGIN_NAME}}
              />
            </h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiTitle>
              <h2>
                <FormattedMessage
                  id="dataPrepper.congratulationsTitle"
                  defaultMessage="Welcome to the Data Prepper OpenSearch Dashboards plugin!"
                />
              </h2>
            </EuiTitle>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiText>
              <EuiTitle size="m">
                <h3>Clusters</h3>
              </EuiTitle>
              <EuiButton type="primary" size="s" onClick={onClickHandler}>
                <FormattedMessage
                  id="dataPrepper.buttonText"
                  defaultMessage="Get Clusters"
                />
              </EuiButton>
              <EuiBasicTable items={clusters} columns={columns}/>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
