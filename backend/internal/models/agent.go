package models

import "time"

type Agent struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Status        string    `json:"status"`
	LastSeenAt    time.Time `json:"last_seen_at"`
	Version       string    `json:"version"`
	Configuration struct {
		MetricsInterval int      `json:"metrics_interval"`
		Collectors      []string `json:"collectors"`
	} `json:"configuration"`
}