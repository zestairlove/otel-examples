# Opentelemetry-js getting started

[opentelemetry-js getting-started](https://github.com/open-telemetry/opentelemetry-js/blob/main/getting-started/README.md)

This guide walks you through the setup and configuration process for a tracing backend (in this case Zipkin, but Jaeger is simple to use as well), a metrics backend like Prometheus, and auto-instrumentation of NodeJS.

- tracing backend: Zipkin
- metric backend: Prometheus
- auto-instrumentation of NodeJS

## Tracing Your Application with OpenTelemetry

### Setting up a Tracing Backend

- trace backend가 필요하다.(Zipkin or Jaeger)
- Zipkin 설치 (Port: `9411`)
  - [Docker images for OpenZipkin](https://github.com/openzipkin-attic/docker-zipkin)

```bash
docker run --rm -d -p 9411:9411 --name zipkin openzipkin/zipkin
```

### Trace Your NodeJS Application

1. Install the required OpenTelemetry libraries
1. Initialize a global tracer
1. Initialize and register a trace exporter

#### 1. Install the required OpenTelemetry libraries

- To create traces on NodeJS, you will need `@opentelemetry/node`, `@opentelemetry/core`
- and Plugins by application `@opentelemetry/plugin-http`, `@opentelemetry/plugin-https`, `@opentelemetry/plugin-express`

```bash
npm install \
  @opentelemetry/core \
  @opentelemetry/node \
  @opentelemetry/plugin-http \
  @opentelemetry/plugin-https \
  @opentelemetry/plugin-express
```

#### 2. Initialize a global tracer

- Application 코드가 실행되기 전에 Tracing 초기화가 되어야 한다.
- 쉬운 방법은 node의 `-r` 옵션을 사용한다. [cli_r_require_module](https://nodejs.org/dist/latest-v8.x/docs/api/cli.html#cli_r_require_module)

```bash
ts-node -r ./tracing.ts app.ts
```

> typescript, ts-node가 global로 설치되어 있어야 한다.

- Tracing 코드를 초기화하고 Application을 실행하면 Application이 trace를 생성하고 HTTP를 통해 전파한다.
- [Trace Context](https://www.w3.org/TR/trace-context/) 헤더를 지원하는 계측된 서비스가 HTTP를 사용하여 Application을 호출하고, Application이 다른 Application을 HTTP를 사용하여 호출하면 Trace Context 헤더가 올바르게 전파된다.

```ts
// tracing.ts
// 버전에 따른 api 변경 이슈가 있다. v0.14.0 을 사용한 예제
import { LogLevel } from '@opentelemetry/core';
import { NodeTracerProvider } from '@opentelemetry/node';

const provider: NodeTracerProvider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR
});

provider.register();
```

- Trace backend에 traces를 보내려면 export를 등록해야한다.

#### 3. Initialize and Register a Trace Exporter

- traces를 export 하기위한 패키지 설치

```bash
npm install \
  @opentelemetry/tracing \
  @opentelemetry/exporter-zipkin

# for jaeger
# npm install @opentelemetry/exporter-jaeger
```

- tracing, exporter-zipkin의 initialize/register 코드 작성

```ts
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
      serviceName: 'getting-started'
    })
  )
);

console.log('tracing initialized');
```

```bash
ts-node -r ./tracing.ts app.ts
```

- tracer 를 초기화하고, Application이 실행된 상태에서,
- Application에 HTTP 요청을 보내면(http://localhost:8080)
- trace backend에 export된 trace를 확인할 수 있다.

Note: Some spans appear to be duplicated, but they are not. This is because the sample application is both the client and the server for these requests. You see one span that is the client side request timing, and one span that is the server side request timing. Anywhere they don’t overlap is network time.

- Note
  - 일부 Span은 중복된 것 처럼 보이지만, 예제 Application이 클라이언트이자 서버역할을 하도록 작성되었기 때문.
  - 클라이언트 측 요청 타이밍 인 스팬 하나와 서버 측 요청 타이밍 스팬 하나가 표시된다. 겹치지 않는 곳은 네트워크 시간이다.

## Collect Metrics Using OpenTelemetry

This guide assumes you are going to be using Prometheus as your metrics backend. It is currently the only metrics backend supported by OpenTelemetry JS.(2020.10.1)

Note: This section is a work in progress

(WIP)

## Referrence

- [OpenTelemetry API for JavaScript](https://open-telemetry.github.io/opentelemetry-js/)
