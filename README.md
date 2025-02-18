# data_prepper

An OpenSearch Dashboards plugin for interacting with Data Prepper nodes and pipelines.

This project is in a development/demo state.


## Setup

This plugin uses a custom index for storing Data Prepper cluster information.

In order to use this plugin, you must create the following index.

```
PUT .data_prepper_osd
```

After that, you can create Data Prepper configurations.
Use the following example.
You can use any OpenSearch document Id for the Id. 
The following example uses `dataPrepper01`, but the value in this does not matter.

```
PUT .data_prepper_osd/_doc/dataPrepper01
{
  "endpoint" : "http://localhost:4900"
}
```


## Development

The initial work was done against [57e1d27](https://github.com/opensearch-project/OpenSearch-Dashboards/tree/57e1d27faddbf340205afa98dac25882a7d85e29).
If there are compatibility issues, try against that commit.

See the [OpenSearch Dashboards contributing guide](https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/CONTRIBUTING.md) 
for instructions setting up your development environment.

    ## Scripts
    <dl>
      <dt><code>yarn osd bootstrap</code></dt>
      <dd>Execute this to install node_modules and setup the dependencies in your plugin and in OpenSearch Dashboards
      </dd>

      <dt><code>yarn plugin-helpers build</code></dt>
      <dd>Execute this to create a distributable version of this plugin that can be installed in OpenSearch Dashboards
      </dd>
    </dl>

