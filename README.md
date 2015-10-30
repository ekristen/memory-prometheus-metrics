# memory-prometheus-metrics

Uses `memwatch-next` to monitor the instrumented node.js process and exposes the metrics using https://github.com/ekristen/prometheus-client-js


## Usage


### Option 1

Provide an existing Prometheus client.

```javascript
var Prometheus = require('prometheus-client-js')

var client = new Prometheus()

var MemoryMetrics = require('memory-prometheus-metrics')

memoryMetrics(client)

client.createServer().listen()
```


### Option 2

Have `memory-prometheus-metrics` instantiate its own Prometheus client.

```javascript
var MemoryMetrics = require('memory-prometheus-metrics')

var metrics = MemoryMetrics()

metrics.client.createServer.listen()
```
