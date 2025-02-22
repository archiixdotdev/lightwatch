package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
)

// @title LightWatch API
// @version 1.0
// @description API server for LightWatch monitoring system
// @host localhost:3000
// @BasePath /api/v1
func main() {
	app := fiber.New()

	// Enable CORS
	app.Use(cors.New())

	// Setup API routes
	api := app.Group("/api/v1")

	// Setup Swagger
	api.Get("/swagger/*", swagger.HandlerDefault)

	app.Listen(":3000")
}

