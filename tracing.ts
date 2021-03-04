import { LogLevel } from '@opentelemetry/core';
import { NodeTracerProvider } from '@opentelemetry/node';

import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

const provider: NodeTracerProvider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR
});

provider.register();

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ZipkinExporter({
      serviceName: 'getting-started',
      url: 'http://localhost:9411'
    })
  )
);

console.log('tracing initialized');
