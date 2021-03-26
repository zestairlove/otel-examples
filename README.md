# Otel in js

[open-telemetry/opentelemetry-js: OpenTelemetry JavaScript Client](https://github.com/open-telemetry/opentelemetry-js)

![6-pieces](https://p135.p2.n0.cdn.getcloudapp.com/items/6quQlq1p/6a750eaf-320d-40ea-832f-39647c4c9faf.png?source=viewer&v=cc98ccb569512163b9a3c1473a6b4e57)

![otel-layer](https://p135.p2.n0.cdn.getcloudapp.com/items/NQuJ06yy/12956ec7-a377-43fc-b884-759d58b7435c.png?source=viewer&v=cb7cd1af952ab345bce64178be960f8b)

**Otel Layer in js**

- API
  - Core(Semantic Conversions) / API
- SDK
  - node: server application, automatic
  - web: web application, automatic
  - tracing: server/web, manually
  - metric
  - exporter: otel exporter
- Collector
  - 여러 vendor의 데이터를 수신하고 처리 및 내보내는 pipeline 제공
  - zipkin, jaeger, prometheus, otlp
- Plugins
  - node(server)/node의 core, 각 벤더별(express, redis, mysql)로 tracing을 자동화로 수집할 수 있는 plugin 제공

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

#### W3C Trace Context

[W3C Trace Context Level 1](https://www.w3.org/TR/trace-context/)
[W3C Trace Context Level 2](https://w3c.github.io/trace-context/)

- This specification defines standard HTTP headers and a value format to propagate context information that enables distributed tracing scenarios. The specification standardizes how context information is sent and modified between services. Context information uniquely identifies individual requests in a distributed system and also defines a means to add and propagate provider-specific context information.
- 이 사양은 표준 HTTP 헤더와 값 형식을 정의하여 분산 트레이싱 시나리오를 사용하는 컨텍스트 정보를 전파한다. 사양은 컨텍스트 정보가 서비스간에 전송되고 수정되는 방법을 표준화한다. 컨텍스트 정보는 분산 시스템에서 개별 요청을 고유하게 식별하고 공급자 별 컨텍스트 정보를 추가하고 전파하는 수단을 정의한다.

- **w3c/trace-context's Goal**

  - This specification defines formats to pass trace context information across systems. Our goal is to share this with the community so that various tracing and diagnostics products can operate together.
  - 이 사양은 시스템 전체에서 추적 컨텍스트 정보를 전달하는 형식을 정의합니다. 우리의 목표는 다양한 트레이스 및 진단 제품이 함께 작동 할 수 있도록 커뮤니티와 공유하는 것입니다.

#### lightstep Otel: Context Propagation

[OpenTelemetry | Core Concepts: Context Propagation](https://opentelemetry.lightstep.com/core-concepts/context-propagation/)

서비스 경계를 넘어 이벤트를 연관시키는 기능은 분산 트레이싱의 기본 개념 중 하나이다. 이러한 기능을 구현하려면 분산 트레이싱 시스템의 구성 요소가 컨텍스트라고 하는 메타 데이터를 수집, 저장 및 전송할 수 있어야 한다. 컨텍스트는 현재 스팬 및 트레이스를 식별하는 정보를 가지고 있으며, 임의의 correlation을 키 값 쌍으로 포함 할 수 있다. Propagation은 종종 HTTP 헤더를 통해 컨텍스트가 서비스 안팎으로 번들되고 전송되는 수단이다.

- context: 메타데이터, can be passed between functions in process or between processes over an RPC
- 분산 트레이싱 시스템의 구성 요소는 컨텍스트라고 하는 메타 데이터를 수집, 저장 및 전송할 수 있어야 한다.
- propagation: 전송 수단, 일반적으로 HTTP 헤더를 통해 전송

![high-level look at the context propagation architecture in OpenTelemetry](https://images.ctfassets.net/8057oncvx5dp/10uTsHhW4wGt1PboFEglMk/4cdfcf9060a94c4bdca2aaa8eb6701e4/be42171b9a1dfc6e0796f49c23a6e7a6.jpg)

##### Context

- traces는 span들로 구성되며 span은 context(메타데이터)를 가지고 있다.
- context는 span context, correlation context 두가지 타입이 있다.
- baggage context => correlation context: 이전 버전과의 호환성
  - https://github.com/w3c/distributed-tracing-wg/issues/42
- Span Context: 스팬 컨텍스트는 서비스 경계에서 트레이스 정보를 이동하는 데 필요한 데이터를 나타냅니다.
  - traceID: trace identifier
  - spanID: span identifier
  - traceFlags: trace options
  - traceState: trace state
- Correlation Context: Correlation 컨텍스트는 사용자가 정의한 속성을 전달한다.
  - identifier
  - analysis

##### Propagation

Propagation은 서비스와 프로세스 간의 컨텍스트의 이동을 가능케하는 메커니즘이다.

OpenTelemetry가 인식하는 propagation에 관한 몇 가지 프로토콜이 있다.

- [W3C Trace-Context HTTP Propagator](https://w3c.github.io/trace-context/)
- W3C Correlation-Context HTTP Propagator
  - [W3C Baggage-Context HTTP Propagator](https://w3c.github.io/baggage/)
- [B3 Zipkin HTTP Propagator](https://github.com/openzipkin/b3-propagation)

#### Trace Context Reference

- [OpenTelemetry | Core Concepts](https://opentelemetry.lightstep.com/core-concepts/context-propagation/)
- [w3c/trace-context: Trace Context](https://github.com/w3c/trace-context)
- [w3c/distributed-tracing-wg: Distributed Tracing Working Group](https://github.com/w3c/distributed-tracing-wg)
- [opentelemetry-specification/specification at main · open-telemetry/opentelemetry-specification](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification)
- [opentelemetry-specification/api-propagators.md at main · open-telemetry/opentelemetry-specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/context/api-propagators.md)

### B3 Propagation

[openzipkin/b3-propagation: Repository that describes and sometimes implements B3 propagation](https://github.com/openzipkin/b3-propagation)
