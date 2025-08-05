package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthCheck(t *testing.T) {
	// Skip test nếu không có database connection
	if db == nil {
		t.Skip("Skipping test - no database connection")
	}

	// Tạo request để truyền vào handler
	req, err := http.NewRequest("GET", "/api/health", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Tạo ResponseRecorder để ghi lại response
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(healthCheck)

	// Handlers của chúng ta thỏa mãn http.Handler, nên chúng ta có thể gọi method ServeHTTP
	// trực tiếp và truyền vào Request và ResponseRecorder
	handler.ServeHTTP(rr, req)

	// Kiểm tra status code có đúng như mong đợi không
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler trả về status code sai: got %v want %v",
			status, http.StatusOK)
	}

	// Kiểm tra response body có chứa các trường mong đợi không
	var response HealthResponse
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	if err != nil {
		t.Errorf("Không thể unmarshal response: %v", err)
	}

	if response.Status == "" {
		t.Error("Mong đợi trường status trong response")
	}

	if response.Message == "" {
		t.Error("Mong đợi trường message trong response")
	}
}

func TestCreateDestination(t *testing.T) {
	// Skip test nếu không có database connection
	if db == nil {
		t.Skip("Skipping test - no database connection")
	}

	// Dữ liệu test
	destination := Destination{
		Name:        "Test Destination",
		Description: "Test description",
	}

	jsonData, _ := json.Marshal(destination)

	// Tạo request để truyền vào handler
	req, err := http.NewRequest("POST", "/api/destinations", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Tạo ResponseRecorder để ghi lại response
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createDestination)

	// Handlers của chúng ta thỏa mãn http.Handler, nên chúng ta có thể gọi method ServeHTTP
	// trực tiếp và truyền vào Request và ResponseRecorder
	handler.ServeHTTP(rr, req)

	// Kiểm tra status code có đúng như mong đợi không
	if status := rr.Code; status != http.StatusCreated {
		t.Errorf("handler trả về status code sai: got %v want %v",
			status, http.StatusCreated)
	}

	// Kiểm tra response body có chứa các trường mong đợi không
	var response Destination
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	if err != nil {
		t.Errorf("Không thể unmarshal response: %v", err)
	}

	if response.Name != destination.Name {
		t.Errorf("Mong đợi name %s, got %s", destination.Name, response.Name)
	}

	if response.Description != destination.Description {
		t.Errorf("Mong đợi description %s, got %s", destination.Description, response.Description)
	}
}

func TestCreateDestinationInvalidData(t *testing.T) {
	// Skip test nếu không có database connection
	if db == nil {
		t.Skip("Skipping test - no database connection")
	}

	// Test với JSON không hợp lệ
	req, err := http.NewRequest("POST", "/api/destinations", bytes.NewBuffer([]byte("invalid json")))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createDestination)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler trả về status code sai: got %v want %v",
			status, http.StatusBadRequest)
	}
}

func TestCreateDestinationEmptyFields(t *testing.T) {
	// Skip test nếu không có database connection
	if db == nil {
		t.Skip("Skipping test - no database connection")
	}

	// Test với các trường rỗng
	destination := Destination{
		Name:        "",
		Description: "",
	}

	jsonData, _ := json.Marshal(destination)

	req, err := http.NewRequest("POST", "/api/destinations", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createDestination)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler trả về status code sai: got %v want %v",
			status, http.StatusBadRequest)
	}
} 