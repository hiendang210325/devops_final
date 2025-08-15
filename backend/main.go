package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Destination struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
}

type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Message   string    `json:"message"`
}

var (
	client         *mongo.Client
	destinationCol *mongo.Collection
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Không tìm thấy file .env, sử dụng biến môi trường hệ thống")
	}

	// Lấy MongoDB URI từ biến môi trường
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI không được thiết lập. Vui lòng thiết lập biến môi trường MONGODB_URI")
	}

	// Kết nối đến MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Lỗi kết nối MongoDB:", err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Printf("Lỗi ngắt kết nối MongoDB: %v", err)
		}
	}()

	// Test kết nối MongoDB
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Lỗi ping MongoDB:", err)
	}
	log.Println("Kết nối MongoDB thành công")

	// Khởi tạo collection
	database := client.Database("travel_app")
	destinationCol = database.Collection("destinations")

	// Khởi tạo dữ liệu mẫu
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

	log.Printf("🏴‍☠️ Travel Backend Server đang khởi động trên port %s với MongoDB", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func initDatabase() {
	ctx := context.Background()

	// Kiểm tra xem đã có dữ liệu chưa
	count, err := destinationCol.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Printf("Lỗi kiểm tra số lượng destinations: %v", err)
		return
	}

	// Chèn dữ liệu mẫu nếu collection trống
	if count == 0 {
		sampleDestinations := []interface{}{
			Destination{
				Name:        "Hội An",
				Description: "Ancient town with lanterns and heritage.",
				CreatedAt:   time.Now(),
			},
			Destination{
				Name:        "Hạ Long Bay",
				Description: "Beautiful bay with limestone islands.",
				CreatedAt:   time.Now(),
			},
			Destination{
				Name:        "Sapa",
				Description: "Mountainous region with ethnic minorities.",
				CreatedAt:   time.Now(),
			},
			Destination{
				Name:        "Mekong Delta",
				Description: "River life and floating markets.",
				CreatedAt:   time.Now(),
			},
			Destination{
				Name:        "Phú Quốc",
				Description: "Tropical island paradise.",
				CreatedAt:   time.Now(),
			},
		}

		_, err = destinationCol.InsertMany(ctx, sampleDestinations)
		if err != nil {
			log.Printf("Lỗi chèn dữ liệu mẫu: %v", err)
		} else {
			log.Println("Dữ liệu destinations mẫu đã được chèn thành công vào MongoDB")
		}
	}
}

func getDestinations(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	cursor, err := destinationCol.Find(ctx, bson.D{})
	if err != nil {
		log.Printf("Lỗi truy vấn destinations: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var destinations []Destination
	if err = cursor.All(ctx, &destinations); err != nil {
		log.Printf("Lỗi decode destinations: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Nếu không có dữ liệu, trả về mảng rỗng thay vì null
	if destinations == nil {
		destinations = []Destination{}
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

	// Thiết lập thời gian tạo
	destination.CreatedAt = time.Now()

	ctx := context.Background()
	result, err := destinationCol.InsertOne(ctx, destination)
	if err != nil {
		log.Printf("Lỗi tạo destination: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Gán ID được tạo từ MongoDB
	destination.ID = result.InsertedID.(primitive.ObjectID)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(destination)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	// Kiểm tra kết nối MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	err := client.Ping(ctx, nil)
	status := "healthy"
	message := "🏴‍☠️ Travel Backend đang chạy mượt mà với MongoDB, thuyền trưởng!"

	if err != nil {
		status = "unhealthy"
		message = "☠️ Kết nối MongoDB thất bại!"
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
