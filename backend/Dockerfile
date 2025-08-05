# Giai đoạn build
FROM golang:1.21-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file go mod
COPY go.mod go.sum ./

# Tải dependencies
RUN go mod download

# Copy source code
COPY . .

# Build ứng dụng
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Giai đoạn cuối
FROM alpine:latest

# Cài đặt ca-certificates cho HTTPS requests
RUN apk --no-cache add ca-certificates

# Thiết lập thư mục làm việc
WORKDIR /root/

# Copy binary từ giai đoạn builder
COPY --from=builder /app/main .

# Mở port
EXPOSE 8080

# Chạy ứng dụng
CMD ["./main"] 