package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/lib/pq"
	"github.com/rs/cors"
)

type Destination struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Message   string    `json:"message"`
}

var db *sql.DB

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Không tìm thấy file .env, sử dụng biến môi trường hệ thống")
	}

	// Lấy URL database từ biến môi trường
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Println("DATABASE_URL không được thiết lập, sử dụng kết nối local mặc định")
		dbURL = "postgres://postgres@localhost:5432/destinations?sslmode=disable"
	}

	// Kết nối đến database
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Lỗi kết nối database:", err)
	}
	defer db.Close()

	// Test kết nối database
	err = db.Ping()
	if err != nil {
		log.Fatal("Lỗi ping database:", err)
	}
	log.Println("Kết nối database thành công")

	// Khởi tạo database với dữ liệu mẫu
	initDatabase()

	// Tạo router
	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/destinations", getDestinations).Methods("GET")
	api.HandleFunc("/destinations", createDestination).Methods("POST")
	api.HandleFunc("/health", healthCheck).Methods("GET")

	// Cấu hình CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	// Áp dụng middleware CORS
	handler := c.Handler(r)

	// Lấy port từ biến môi trường
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🏴‍☠️ Travel Backend Server đang khởi động trên port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func initDatabase() {
	// Tạo bảng destinations nếu chưa tồn tại
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS destinations (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		description TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createTableSQL)
	if err != nil {
		log.Printf("Lỗi tạo bảng: %v", err)
		return
	}

	// Kiểm tra xem đã có dữ liệu chưa
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM destinations").Scan(&count)
	if err != nil {
		log.Printf("Lỗi kiểm tra số lượng destinations: %v", err)
		return
	}

	// Chèn dữ liệu mẫu nếu bảng trống
	if count == 0 {
		insertSQL := `
		INSERT INTO destinations (name, description) VALUES 
		('Hội An', 'Ancient town with lanterns and heritage.'),
		('Hạ Long Bay', 'Beautiful bay with limestone islands.'),
		('Sapa', 'Mountainous region with ethnic minorities.'),
		('Mekong Delta', 'River life and floating markets.'),
		('Phú Quốc', 'Tropical island paradise.');`

		_, err = db.Exec(insertSQL)
		if err != nil {
			log.Printf("Lỗi chèn dữ liệu mẫu: %v", err)
		} else {
			log.Println("Dữ liệu destinations mẫu đã được chèn thành công")
		}
	}
}

func getDestinations(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, description FROM destinations ORDER BY id")
	if err != nil {
		log.Printf("Lỗi truy vấn destinations: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var destinations []Destination
	for rows.Next() {
		var d Destination
		err := rows.Scan(&d.ID, &d.Name, &d.Description)
		if err != nil {
			log.Printf("Lỗi scan destination: %v", err)
			continue
		}
		destinations = append(destinations, d)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Lỗi lặp destinations: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(destinations)
}

func createDestination(w http.ResponseWriter, r *http.Request) {
	var destination Destination
	err := json.NewDecoder(r.Body).Decode(&destination)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if destination.Name == "" || destination.Description == "" {
		http.Error(w, "Name and description are required", http.StatusBadRequest)
		return
	}

	var id int
	err = db.QueryRow("INSERT INTO destinations (name, description) VALUES ($1, $2) RETURNING id",
		destination.Name, destination.Description).Scan(&id)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			log.Printf("Lỗi database: %v", pqErr)
		}
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	destination.ID = id

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(destination)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	// Kiểm tra kết nối database
	err := db.Ping()
	status := "healthy"
	message := "🏴‍☠️ Travel Backend đang chạy mượt mà, thuyền trưởng!"

	if err != nil {
		status = "unhealthy"
		message = "☠️ Kết nối database thất bại!"
		log.Printf("Health check thất bại: %v", err)
	}

	response := HealthResponse{
		Status:    status,
		Timestamp: time.Now(),
		Message:   message,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Trigger backend workflow 
