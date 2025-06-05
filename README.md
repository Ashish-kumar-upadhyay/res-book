# The Residents Book

A full-stack web application for managing resident profiles with a clean and modern UI.

## Features

- Display resident cards with profile information
- Add new residents through a modal form
- Required fields validation
- Social media links (LinkedIn & Twitter)
- Responsive grid layout
- Smooth animations and transitions
- Toast notifications

## Tech Stack

- Frontend: React + Vite
- UI Library: Material-UI
- Backend: Express.js
- Database: MongoDB
- Deployment: Vercel (Frontend & Backend)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://Ashish5161:Ashish0328@cluster0.esaia.mongodb.net/residentsbook
PORT=5000
```

4. Start the development server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd backend
vercel
```

### Frontend Deployment (Vercel)

1. Update the API URL in the frontend code to point to your deployed backend URL

2. Deploy:
```bash
cd frontend
vercel
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 