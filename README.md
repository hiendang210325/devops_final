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

- **Frontend**: Automatically deployed to Netlify via GitHub Actions
- **Backend**: Automatically deployed to Render via GitHub Actions
- **Database**: MongoDB Cloud

### GitHub Secrets Required

For automated deployment, set up these secrets in your GitHub repository:

**For Render (Backend)**:

- `RENDER_SERVICE_ID`: Your Render service ID
- `RENDER_API_KEY`: Your Render API key
- `MONGODB_URI`: Your MongoDB connection string

**For Netlify (Frontend)**:

- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your Netlify site ID
- `VITE_BACKEND_URL`: Your backend URL on Render (e.g., `https://your-service.onrender.com`)

### Manual Deployment

**Deploy Backend to Render:**

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `go build -o main .`
4. Set start command: `./main`
5. Add environment variables (MONGODB_URI, PORT=8080)

**Deploy Frontend to Netlify:**

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_BACKEND_URL`

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
