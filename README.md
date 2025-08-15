# 🏴‍☠️ Travel Landing Page - DevOps Project

Ahoy matey! Welcome to our travel landing page project showcasing the beauty of Vietnam!

## 🗺️ Project Overview

This is a complete DevOps project featuring:

- **Frontend**: ReactJS landing page deployed on Render
- **Backend**: Golang REST API with MongoDB Cloud deployed on Netlify
- **CI/CD**: Automated deployment using GitHub Actions

## 🏗️ Project Structure

```
travel-landing/
├── backend/          # Golang REST API + MongoDB Cloud
├── frontend/         # ReactJS landing page
├── .github/workflows/
│   ├── frontend.yml
│   └── backend.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Go 1.21+
- MongoDB Cloud Account
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd travel-landing
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**

   ```bash
   cd backend
   go mod tidy

   # Tạo file .env với MongoDB connection string
   cp .env.example .env
   # Chỉnh sửa .env và thay thế <db_password> bằng password thực tế

   go run main.go
   ```

4. **MongoDB Setup**

   - Tạo tài khoản MongoDB Cloud tại https://cloud.mongodb.com
   - Tạo cluster mới
   - Thiết lập database user và password
   - Whitelist IP address
   - Sao chép connection string vào file .env

## 🌍 Deployment

- **Frontend**: Automatically deployed to Render via GitHub Actions
- **Backend**: Automatically deployed to Netlify via GitHub Actions
- **Database**: MongoDB Cloud

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
go test ./...
```

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb+srv://hiendang:<db_password>@cluster0.83zr5s5.mongodb.net/travel_app?retryWrites=true&w=majority
PORT=8080
```

## 🏴‍☠️ DevOps Features

- ✅ Automated CI/CD pipeline
- ✅ Unit testing
- ✅ Environment-based deployment
- ✅ MongoDB Cloud integration
- ✅ Modern web technologies

---

_Built with ❤️ and ☠️ for DevOps learning_
"# Trigger new workflow"
