# 🚀 Deployment Guide

## Overview

This project deploys using a dual-platform approach:

- **Backend (Go)**: Render
- **Frontend (React)**: Netlify
- **Database**: MongoDB Cloud

## Prerequisites

- GitHub repository with this code
- Render account
- Netlify account
- MongoDB Cloud account

## Step 1: Setup MongoDB Cloud

1. Create a MongoDB Atlas cluster
2. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`
3. Save connection string for later use

## Step 2: Deploy Backend to Render

### Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `travel-backend`
   - **Branch**: `main`
   - **Build Command**: `go build -o main .`
   - **Start Command**: `./main`
   - **Instance Type**: Free

### Environment Variables

Add these in Render dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel_app?retryWrites=true&w=majority
PORT=8080
```

## Step 3: Deploy Frontend to Netlify

### Manual Setup

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure:
   - **Branch**: `main`
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Environment Variables

Add these in Netlify dashboard:

```
VITE_BACKEND_URL=https://your-render-service.onrender.com
```

## Step 4: Automated Deployment (GitHub Actions)

For automatic deployment on every push, set up GitHub secrets:

### GitHub Repository Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add New Repository Secret for each:

**Render Secrets:**

- `RENDER_SERVICE_ID`: Get from Render service dashboard
- `RENDER_API_KEY`: Generate in Render account settings
- `MONGODB_URI`: Your MongoDB connection string

**Netlify Secrets:**

- `NETLIFY_AUTH_TOKEN`: Generate in Netlify user settings
- `NETLIFY_SITE_ID`: Get from Netlify site dashboard
- `VITE_BACKEND_URL`: Your Render backend URL

### Finding Your IDs

**Render Service ID:**

```
https://dashboard.render.com/web/srv-xxxxxxxxx
                                ^^^^^^^^
                              Service ID
```

**Netlify Site ID:**

```
Site settings → General → Site details → Site ID
```

## Step 5: Verify Deployment

1. **Backend**: Visit your Render URL
2. **Frontend**: Visit your Netlify URL
3. **Check logs**: Monitor both platforms for any errors

## Troubleshooting

### Common Issues

**Backend won't start:**

- Check MONGODB_URI format
- Verify MongoDB IP whitelist (allow all: 0.0.0.0/0)
- Check Render logs for detailed errors

**Frontend API calls fail:**

- Verify VITE_BACKEND_URL is correct
- Check CORS settings in backend
- Ensure backend is running

**GitHub Actions fail:**

- Verify all secrets are set correctly
- Check action logs for specific errors
- Ensure service IDs and tokens are valid

### Health Check URLs

- Backend: `https://your-render-service.onrender.com/`
- Frontend: `https://your-netlify-site.netlify.app/`

## Monitoring

- **Render**: Built-in metrics and logs
- **Netlify**: Build logs and function analytics
- **MongoDB**: Atlas monitoring dashboard

---

🎉 **Deployment Complete!** Your travel website is now live with automatic CI/CD!
