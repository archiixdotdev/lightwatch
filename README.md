# LightWatch: Open Source Lightweight Infrastructure Monitoring

## Table of Content

- [Summary](#summary)
- [Problem Statement](#problem-statement)
- [System Architecture](#system-architecture)
- [Communication Flow](#communication-flow)
- [Agent Architecture](#agent-architecture)
- [Server Architecture](#server-architecture)
- [Deployment Options](#deployment-options)
  - [Single Server](#single-server)
- [Security Architecture](#security-architecture)

### Summary
LightWatch is an open source infrastructure monitoring platform designed to be lightweight, secure, and easy to deploy. It uses a tunnel-based communication approach between agents and the central server, ensuring efficient and secure data transmission while maintaining minimal resource overhead.

### Problem Statement
Current infrastructure monitoring solutions face several challenges:
1. High resource consumption and system overhead
2. Complex setup processes and configuration
3. Insecure or inefficient data transmission methods
4. Heavy dependencies on external services
5. Complex deployment architectures
6. Network security concerns in distributed environments

### System Architecture

```mermaid
flowchart TD
    subgraph "Agent Components"
        MC[Metric Collector] --> AB[Agent Buffer]
        AB --> AT[Agent Tunnel]
        AT --> |Secure Tunnel| ST
    end

    subgraph "Central Server"
        ST[Server Tunnel Manager] --> TP[Transform & Process]
        TP --> TSB[Time Series Buffer]
        TSB --> DB[(Embedded DB)]
        DB --> API[API Server]
        API --> WU[Web UI]
    end

    subgraph "Admin Access"
        WU --> UA[User Access]
        API --> TA[Tool Access]
    end
```

### Communication Flow

```mermaid
sequenceDiagram
    participant Agent
    participant Server
    participant Storage
    
    Agent->>Server: Initial Authentication (HTTPS)
    Server->>Agent: Auth Success + Tunnel Config
    
    rect rgb(200, 220, 255)
        Note over Agent,Server: Secure Tunnel Setup
        Agent->>Server: Establish mTLS Tunnel
        Server->>Agent: Tunnel Ready
    end
    
    loop Metric Collection
        Agent->>Server: Stream Compressed Metrics
        Server->>Storage: Batch Store
        Storage-->>Server: Acknowledge
    end
```

#### Agent Architecture
```mermaid
flowchart LR
    subgraph "Agent"
        C[Collectors] --> P[Processor]
        P --> B[Buffer]
        B --> T[Tunnel]
        T --> |Secure Channel| S[Server]
    end
```

#### Server Architecture
```mermaid
flowchart TD
    subgraph "Server Components"
        TM[Tunnel Manager] --> P[Processor]
        P --> TS[Time Series]
        TS --> Q[Query Engine]
        Q --> A[API Server]
        A --> W[Web UI]
    end
```


### Deployment Options

#### Single Server
```mermaid
flowchart LR
    A1[Agent 1] -->|Tunnel| S[Server]
    A2[Agent 2] -->|Tunnel| S
    A3[Agent 3] -->|Tunnel| S
    S --> DB[(Database)]
```

### Security Architecture

```mermaid
flowchart TD
    subgraph "Security Layers"
        A1[Initial Auth] --> T1[TLS Tunnel]
        T1 --> E1[Encrypted Data]
        E1 --> S1[Secure Storage]
    end
```