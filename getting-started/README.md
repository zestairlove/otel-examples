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
yarn add \
  @opentelemetry/tracing \
  @opentelemetry/exporter-zipkin

# for jaeger
# yarn add @opentelemetry/exporter-jaeger
```

- tracing, exporter-zipkin의 initialize/register 코드 작성

(WIP)

---

## Referrence

- [OpenTelemetry API for JavaScript](https://open-telemetry.github.io/opentelemetry-js/)
