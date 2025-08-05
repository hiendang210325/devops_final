# 🏴‍☠️ Hướng Dẫn Triển Khai - Travel Landing Page

Ahoy matey! Hướng dẫn này sẽ giúp bạn triển khai trang landing page du lịch lên biển internet!

## 🌍 Nền Tảng Triển Khai

### Frontend: Render

- **Nền tảng**: Render (Static Site)
- **Framework**: ReactJS với Vite
- **Domain**: `https://your-app-name.onrender.com`

### Backend: Netlify

- **Nền tảng**: Netlify Functions
- **Ngôn ngữ**: Golang
- **Domain**: `https://your-backend-name.netlify.app`

### Database: PostgreSQL

- **Nền tảng**: Local/Cloud (Render, Railway, hoặc Supabase)
- **Database Name**: destinations
- **Kết nối**: Biến môi trường

## 🚀 Triển Khai Từng Bước

### 1. Triển Khai Frontend (Render)

#### Yêu Cầu

- GitHub repository với dự án
- Tài khoản Render

#### Các Bước

1. **Tạo Tài Khoản Render**

   - Truy cập [render.com](https://render.com)
   - Đăng ký với GitHub

2. **Tạo Static Site Mới**

   - Nhấp "New +" → "Static Site"
   - Kết nối GitHub repository
   - Chọn repository

3. **Cấu Hình Build Settings**

   ```
   Build Command: npm run build
   Publish Directory: dist
   Root Directory: frontend
   ```

4. **Biến Môi Trường**

   - Thêm `VITE_BACKEND_URL` với URL backend của bạn
   - Ví dụ: `https://your-backend-name.netlify.app`

5. **Triển Khai**
   - Nhấp "Create Static Site"
   - Chờ triển khai hoàn tất

### 2. Triển Khai Backend (Netlify)

#### Yêu Cầu

- Tài khoản Netlify
- Netlify CLI (tùy chọn)

#### Các Bước

1. **Tạo Tài Khoản Netlify**

   - Truy cập [netlify.com](https://netlify.com)
   - Đăng ký với GitHub

2. **Triển Khai Qua Git**

   - Nhấp "New site from Git"
   - Kết nối GitHub repository
   - Chọn repository

3. **Cấu Hình Build Settings**

   ```
   Base directory: backend
   Build command: go build -o server main.go
   Publish directory: backend
   ```

4. **Biến Môi Trường**

   - Thêm `DATABASE_URL` với connection string PostgreSQL
   - Thêm `PORT` (Netlify sẽ tự động thiết lập)

5. **Triển Khai**
   - Nhấp "Deploy site"
   - Chờ triển khai hoàn tất

### 3. Thiết Lập Database

#### Tùy Chọn A: PostgreSQL Local

```bash
# Cài đặt PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Tải từ postgresql.org

# Tạo database
createdb destinations

# Chạy script khởi tạo
psql -d destinations -f backend/init.sql
```

#### Tùy Chọn B: PostgreSQL Cloud (Khuyến Nghị)

1. **Render PostgreSQL**

   - Tạo PostgreSQL service mới trên Render
   - Copy connection string vào biến môi trường

2. **Railway PostgreSQL**

   - Truy cập [railway.app](https://railway.app)
   - Tạo PostgreSQL database mới
   - Copy connection string

3. **Supabase**
   - Truy cập [supabase.com](https://supabase.com)
   - Tạo project mới
   - Sử dụng connection string từ settings

## 🔧 Thiết Lập GitHub Actions

### 1. Repository Secrets

Thêm các secrets này vào GitHub repository:

#### Cho Frontend (Render)

- `RENDER_API_KEY`: API key Render của bạn
- `RENDER_FRONTEND_SERVICE_ID`: ID service Render
- `BACKEND_URL`: URL backend của bạn

#### Cho Backend (Netlify)

- `NETLIFY_AUTH_TOKEN`: Auth token Netlify
- `NETLIFY_SITE_ID`: Site ID Netlify

### 2. Lấy API Keys

#### Render API Key

1. Truy cập Render Dashboard
2. Nhấp profile → "Account Settings"
3. Copy API key

#### Netlify Auth Token

1. Truy cập Netlify Dashboard
2. Nhấp profile → "User settings"
3. Vào "Applications" → "Personal access tokens"
4. Tạo token mới

### 3. Service IDs

#### Render Service ID

1. Truy cập service trên Render
2. Copy service ID từ URL hoặc settings

#### Netlify Site ID

1. Truy cập site trên Netlify
2. Copy site ID từ URL hoặc settings

## 🐳 Triển Khai Docker (Tùy Chọn)

### Phát Triển Local

```bash
# Khởi động tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### Triển Khai Production

```bash
# Build và chạy backend
cd backend
docker build -t travel-backend .
docker run -p 8080:8080 -e DATABASE_URL=your_db_url travel-backend

# Build và chạy frontend
cd frontend
docker build -t travel-frontend .
docker run -p 80:80 travel-frontend
```

## 🔍 Kiểm Tra Triển Khai

### 1. Health Check

```bash
# Kiểm tra health backend
curl https://your-backend-name.netlify.app/api/health

# Response mong đợi
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "message": "🏴‍☠️ Travel Backend đang chạy mượt mà, thuyền trưởng!"
}
```

### 2. API Endpoints

```bash
# Lấy danh sách điểm đến
curl https://your-backend-name.netlify.app/api/destinations

# Tạo điểm đến mới
curl -X POST https://your-backend-name.netlify.app/api/destinations \
  -H "Content-Type: application/json" \
  -d '{"name":"Đà Nẵng","description":"Thành phố biển xinh đẹp"}'
```

### 3. Frontend

- Truy cập URL frontend
- Kiểm tra điểm đến có load không
- Xác nhận tích hợp API

## 🚨 Xử Lý Sự Cố

### Vấn Đề Thường Gặp

#### Frontend Không Load Dữ Liệu

- Kiểm tra biến môi trường `VITE_BACKEND_URL`
- Xác nhận backend đang chạy và có thể truy cập
- Kiểm tra console browser cho lỗi CORS

#### Backend Connection Issues

- Xác nhận `DATABASE_URL` đúng
- Kiểm tra database có thể truy cập không
- Review backend logs

#### GitHub Actions Failures

- Xác nhận tất cả secrets được thiết lập đúng
- Kiểm tra build logs cho lỗi cụ thể
- Đảm bảo repository structure khớp với paths mong đợi

### Debug Commands

```bash
# Test kết nối database
psql $DATABASE_URL -c "SELECT 1;"

# Test backend local
cd backend
go run main.go

# Test frontend local
cd frontend
npm run dev
```

## 📊 Monitoring

### Health Checks

- Thiết lập monitoring cho endpoint `/api/health`
- Monitor response times và availability
- Thiết lập alerts cho failures

### Logs

- Monitor application logs
- Thiết lập log aggregation (nếu cần)
- Theo dõi error rates và performance

## 🔒 Cân Nhắc Bảo Mật

### Biến Môi Trường

- Không bao giờ commit dữ liệu nhạy cảm vào Git
- Sử dụng secret management của platform
- Rotate API keys thường xuyên

### Cấu Hình CORS

- Cấu hình allowed origins đúng cách
- Giới hạn cho specific domains trong production
- Xem lại security headers

### Bảo Mật Database

- Sử dụng mật khẩu mạnh
- Bật SSL connections
- Backup thường xuyên
- Kiểm soát truy cập

---

🏴‍☠️ **Chúc Triển Khai Thành Công, Thuyền Trưởng!** Mong ứng dụng của bạn lướt mượt trên biển kỹ thuật số! ☠️
