# 🚀 Backend Deployment Guide

This guide will help you deploy your math questions backend for free.

## ✅ **Backend is Working Locally!**

Your backend server is now running at `http://localhost:3001` with these endpoints:

- **Health Check**: `GET /api/health`
- **Get Questions**: `GET /api/questions`
- **Add Question**: `POST /api/questions`

## 🆓 **Free Deployment Options**

### **Option 1: Render (Recommended - Easiest)**

1. **Create Render Account**

   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set these options:
     - **Name**: `math-questions-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Get Your URL**
   - After deployment, you'll get a URL like: `https://math-questions-backend.onrender.com`
   - Copy this URL for the frontend

### **Option 2: Railway (Alternative)**

1. **Create Railway Account**

   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `backend`
   - Deploy automatically

### **Option 3: Vercel (Alternative)**

1. **Create Vercel Account**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy**
   - Import your GitHub repository
   - Set root directory to `backend`
   - Deploy

## 🔧 **Update Frontend to Use Deployed Backend**

Once you have your deployed backend URL, update the frontend:

1. **Edit `src/lib/questionUtils.ts`**

   ```typescript
   const API_BASE_URL =
     process.env.NODE_ENV === "production"
       ? "https://your-backend-url.onrender.com" // Replace with your actual URL
       : "http://localhost:3001";
   ```

2. **Replace `your-backend-url.onrender.com`** with your actual deployed URL

## 🧪 **Test Your Deployed Backend**

### **Health Check**

```bash
curl https://your-backend-url.onrender.com/api/health
```

### **Add a Test Question**

```bash
curl -X POST https://your-backend-url.onrender.com/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is 2 + 2?",
    "choices": ["3", "4", "5", "6"],
    "correctAnswer": "4",
    "skill": "algebra-basics",
    "grade": "5",
    "level": "easy"
  }'
```

### **Get All Questions**

```bash
curl https://your-backend-url.onrender.com/api/questions
```

## 📁 **Data Storage**

Your questions will be stored in a JSON file on the deployed server:

```json
{
  "questions": [
    {
      "id": 1703123456789,
      "question": "What is 2 + 2?",
      "choices": ["3", "4", "5", "6"],
      "correctAnswer": "4",
      "skill": "algebra-basics",
      "grade": "5",
      "level": "easy",
      "wave": 1,
      "points": 10,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

## 🔍 **Monitor Your Backend**

### **Render Dashboard**

- Log into [render.com](https://render.com)
- Go to your service dashboard
- Check logs, metrics, and deployment status

### **Health Monitoring**

- Your backend has a health endpoint: `/api/health`
- You can set up monitoring to ping this endpoint

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Backend not responding**

   - Check if the service is running in your deployment dashboard
   - Check logs for errors
   - Verify the start command is correct

2. **CORS errors**

   - The backend has CORS enabled for all origins
   - If you get CORS errors, check the deployment logs

3. **Data not persisting**
   - Free tiers may have limitations on file storage
   - Consider upgrading to a paid plan for production

### **Debug Steps**

1. **Check deployment logs**
2. **Test health endpoint**
3. **Verify environment variables**
4. **Check file permissions**

## 📊 **Free Tier Limitations**

### **Render Free Tier**

- ✅ 750 hours/month
- ✅ Automatic deployments
- ✅ Custom domains
- ❌ Sleeps after 15 minutes of inactivity
- ❌ Limited bandwidth

### **Railway Free Tier**

- ✅ $5 credit monthly
- ✅ Automatic deployments
- ❌ Limited usage

### **Vercel Free Tier**

- ✅ 100GB bandwidth
- ✅ Automatic deployments
- ❌ Serverless functions only

## 🎯 **Next Steps**

1. **Deploy your backend** using one of the options above
2. **Update the frontend** with your backend URL
3. **Test the full flow** - add questions through the frontend
4. **Monitor usage** to stay within free tier limits

## 📞 **Support**

If you encounter issues:

1. Check the deployment platform's documentation
2. Review the backend logs
3. Test endpoints manually
4. Verify environment variables

Your backend is now ready for deployment! 🚀
