package models

import "time"

type Metric struct {
	AgentID   string             `json:"agent_id"`
	Type      string             `json:"type"`
	Timestamp time.Time          `json:"timestamp"`
	Values    map[string]float64 `json:"values"`
	Labels    map[string]string  `json:"labels"`
}
