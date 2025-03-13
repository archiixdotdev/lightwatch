# LightWatch Backend

LightWatch is a monitoring and metrics collection system that provides real-time insights into system performance and resource utilization.

## Features

- Real-time metrics collection and aggregation
- Secure agent connections via TLS
- Authentication and authorization
- Audit logging
- BadgerDB-based metric storage
- RESTful API endpoints

## Prerequisites

- Go 1.21 or later
- BadgerDB
- Make (optional, for using Makefile commands)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/lightwatch/backend.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Build the project:
   ```bash
   go build -o bin/server cmd/server/main.go
   ```

4. Run the server:
   ```bash
   ./bin/server
   ```

## Development

### Project Structure

```
├── cmd/                    # Application entry points
├── internal/              # Private application code
│   ├── api/              # API handlers and middleware
│   ├── auth/             # Authentication logic
│   ├── config/           # Configuration management
│   ├── metrics/          # Metrics collection and storage
│   ├── tunnel/           # Agent connection handling
│   └── audit/            # Audit logging
├── pkg/                   # Public libraries
├── web/                   # Web assets
├── scripts/              # Build and utility scripts
└── deployments/          # Deployment configurations
```

### Running Tests

```bash
go test ./...
```

### Development Server

```bash
./scripts/run-dev.sh
```

## Configuration

Configuration is managed through environment variables and configuration files. See `internal/config` for more details.

## API Documentation

API documentation is available at `/docs` when running the server.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 