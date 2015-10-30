var xtend = require('xtend')
var memwatch = require('memwatch-next')
var Prometheus = require('prometheus-client-js')

module.exports = MemoryMetrics

function MemoryMetrics(client, opts) {

  if (!(client instanceof Prometheus)) {
    if (typeof client == 'object') {
      opts = client
      client = null
    }
  }

  this.opts = opts
  this.client = client || new Prometheus(this.opts)

  var metrics = {
    num_full_gc: this.client.newGauge({
      name: 'num_full_gcs_total',
      subsystem: 'nodejs_memory',
      help: 'Number of Full Garabage Collections'
    }),
    num_inc_gc: this.client.newGauge({
      name: 'num_inc_gcs_total',
      subsystem: 'nodejs_memory',
      help: 'Number of Incremental Garabage Collections'
    }),
    heap_compactions: this.client.newGauge({
      name: 'heap_compactions_total',
      subsystem: 'nodejs_memory',
      help: 'Number of Heap Compactions'
    }),
    estimated_base: this.client.newGauge({
      name: 'estimated_base',
      subsystem: 'nodejs_memory',
      help: 'Estimated base Memory Usage'
    }),
    current_base: this.client.newGauge({
      name: 'current_base',
      subsystem: 'nodejs_memory',
      help: 'Current base Memory Usage'
    }),
    min: this.client.newGauge({
      name: 'min',
      subsystem: 'nodejs_memory',
      help: 'Minimum Memory Usage'
    }),
    max: this.client.newGauge({
      name: 'max',
      subsystem: 'nodejs_memory',
      help: 'Maximum Memory Usage'
    }),
    usage_trend: this.client.newGauge({
      name: 'usage_trend',
      subsystem: 'nodejs_memory',
      help: 'Usage trend'
    }),
    leaks: this.client.newGauge({
      name: 'memory_leaks_total',
      help: 'Total number of memory leaks'
    })
  }

  memwatch.on('leak', function(info) {
    metrics.leaks.increment()
  })
  
  memwatch.on('stats', function(stats) {
    Object.keys(stats).forEach(function(s) {
      if (typeof metrics[s] != 'undefined') {
        metrics[s].set(stats[s])
      }
    })
  })
}
