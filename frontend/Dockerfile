# Giai đoạn build
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build ứng dụng
RUN npm run build

# Giai đoạn production
FROM nginx:alpine

# Copy ứng dụng đã build từ giai đoạn builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy cấu hình nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Mở port
EXPOSE 80

# Khởi động nginx
CMD ["nginx", "-g", "daemon off;"] 