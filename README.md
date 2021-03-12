# Otel in js

[open-telemetry/opentelemetry-js: OpenTelemetry JavaScript Client](https://github.com/open-telemetry/opentelemetry-js)

![6-pieces](https://p135.p2.n0.cdn.getcloudapp.com/items/6quQlq1p/6a750eaf-320d-40ea-832f-39647c4c9faf.png?source=viewer&v=cc98ccb569512163b9a3c1473a6b4e57)

![otel-layer](https://p135.p2.n0.cdn.getcloudapp.com/items/NQuJ06yy/12956ec7-a377-43fc-b884-759d58b7435c.png?source=viewer&v=cb7cd1af952ab345bce64178be960f8b)

## Otel JS Packages

### API

| Package                                                                                                         | Description                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@opentelemetry/api](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages)                     | This package provides TypeScript interfaces, enums and no-op implementations for the OpenTelemetry core trace and metrics model.<br> It is intended for use both on the server and in the browser.<br>OpenTelemetry 코어 트레이싱 및 메트릭 모델에 대한 Typescript 인터페이스, enum 및 no-op 구현을 제공 |
| [@opentelemetry/core](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-core) | This package provides default and no-op implementations of the OpenTelemetry api for trace and metrics.<br> It's intended for use both on the server and in the browser. <br>트레이싱 및 메트릭에 대한 OpentElemetry API의 기본 및 NO-OP 구현을 제공                                                     |

### Implementation / SDKs

| Package                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@opentelemetry/tracing](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-tracing) | This module provides a full control over instrumentation and span creation.<br> It doesn't load [`async_hooks`](https://nodejs.org/api/async_hooks.html) or any instrumentation plugin by default.<br> It is intended for use both on the server and in the browser.<br>계측 및 스팬 생성을 완벽하게 제어 할 수 있다.<br> 기본적으로 ASYNC_HOOKS 또는 모든 계측 플러그인을 로드하지 않는다. |
| [@opentelemetry/metrics](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-metrics) | This module provides instruments and meters for reporting of time series data.                                                                                                                                                                                                                                                                                                              |
| [@opentelemetry/node](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-node)       | This module provides automatic tracing for Node.js applications. It is intended for use on the server only.<br> Node 어플리케이션의 자동화된 트레이싱 제공                                                                                                                                                                                                                                  |
| [@opentelemetry/web](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-web)         | This module provides automated instrumentation and tracing for Web applications. It is intended for use in the browser only.<br>웹 애플리케이션에 대한 자동화 된 계측 및 트레이싱 제공                                                                                                                                                                                                      |

### Compatible Exporters

...

### Instrumentations & Plugins

...

---

## Otel Collector

https://github.com/open-telemetry/opentelemetry-collector

- OpenTelemetry Collector는 원격분석 데이터(telemetry data)를 수신, 처리 및 내보내는 방법에 대해 vendor-agnostic한 구현을 제공한다.
- 또한 여러 오픈 소스 또는 상용 백엔드로 보내는 오픈 소스 원격분석 데이터 형식(Jaeger, Prometheus..)을 지원하기 위해 여러 에이전트/콜렉터를 실행, 운영 및 유지 관리 할 필요가 없다.

Objectives:

- Usable: Reasonable default configuration, supports popular protocols, runs and collects out of the box.
- Performant: Highly stable and performant under varying loads and configurations.
- Observable: An exemplar of an observable service.
- Extensible: Customizable without touching the core code.
- Unified: Single codebase, deployable as an agent or collector with support for traces, metrics and logs.

---

## Otel Terminology

### Open Telemetry

- metric
- trace
- logs

### Spans

[Spans in OpenTelemetry | Lightstep's OpenTelemetry Docs](https://opentelemetry.lightstep.com/spans)

- A span is the building block of a trace and is a named, timed operation that represents a piece of the workflow in the distributed system. Multiple spans are pieced together to create a trace.
- 스팬은 trace 빌딩 블록이며 분산 시스템에서 워크 플로의 일부를 나타내는 시간 지정 작업이다. 여러 스팬이 함께 결합되어 트레이스를 생성한다.

### Trace Context

[Trace Context](https://www.w3.org/TR/trace-context/)

- This specification defines standard HTTP headers and a value format to propagate context information that enables distributed tracing scenarios. The specification standardizes how context information is sent and modified between services. Context information uniquely identifies individual requests in a distributed system and also defines a means to add and propagate provider-specific context information.
- 이 사양은 표준 HTTP 헤더와 값 형식을 정의하여 분산 추적 시나리오를 사용하는 컨텍스트 정보를 전파한다. 사양은 컨텍스트 정보가 서비스간에 전송되고 수정되는 방법을 표준화한다. 컨텍스트 정보는 분산 시스템에서 개별 요청을 고유하게 식별하고 공급자 별 컨텍스트 정보를 추가하고 전파하는 수단을 정의한다.

### B3 Propagation

[openzipkin/b3-propagation: Repository that describes and sometimes implements B3 propagation](https://github.com/openzipkin/b3-propagation)
