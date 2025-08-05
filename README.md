# 🏴‍☠️ Travel Landing Page - DevOps Project

Ahoy matey! Welcome to our travel landing page project showcasing the beauty of Vietnam!

## 🗺️ Project Overview

This is a complete DevOps project featuring:

- **Frontend**: ReactJS landing page deployed on Render
- **Backend**: Golang REST API with PostgreSQL deployed on Netlify
- **CI/CD**: Automated deployment using GitHub Actions

## 🏗️ Project Structure

```
travel-landing/
├── backend/          # Golang REST API + PostgreSQL
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
- PostgreSQL
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
   go run main.go
   ```

4. **Database Setup**

   ```sql
   CREATE TABLE destinations (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     description TEXT
   );

   INSERT INTO destinations (name, description)
   VALUES ('Hội An', 'Ancient town with lanterns and heritage.');
   ```

## 🌍 Deployment

- **Frontend**: Automatically deployed to Render via GitHub Actions
- **Backend**: Automatically deployed to Netlify via GitHub Actions
- **Database**: PostgreSQL (local/cloud)

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
DATABASE_URL=postgres://postgres@localhost:5432/travel
PORT=8080
```

## 🏴‍☠️ DevOps Features

- ✅ Automated CI/CD pipeline
- ✅ Unit testing
- ✅ Environment-based deployment
- ✅ Database integration
- ✅ Modern web technologies

---

_Built with ❤️ and ☠️ for DevOps learning_
