# TradeFlow

TradeFlow is a multi-service trading platform consisting of three applications:

- `frontend/` — Responsive public landing portal (Create React App, React 19, Bootstrap 5)
- `dashboard/` — Responsive trading terminal (Create React App, React 18, Chart.js, Material UI)
- `backend/` — Express 5 + Mongoose REST API (`/health`, `/allHoldings`, `/allPositions`, `/allOrders`, `/newOrder`)

## Local Development

1. Configure environment variables using the `.env.example` template in each folder (`backend/.env.example`, `frontend/.env.example`, `dashboard/.env.example`).
2. Start each service in separate terminals:
   - `backend/`: `npm install && npm start` (runs on port `3002`)
   - `frontend/`: `npm install && npm start` (runs on port `3000`)
   - `dashboard/`: `npm install && npm start` (runs on port `3001`)

## Production Deployment Settings

### Backend (Render Web Service)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/health`
- **Environment Variables**: `NODE_ENV=production`, `MONGO_URL`, `FRONTEND_URL`, `DASHBOARD_URL`

### Frontend (Vercel)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **SPA Routing**: Configured via `frontend/vercel.json`
- **Environment Variables**: `REACT_APP_DASHBOARD_URL`

### Dashboard (Vercel)
- **Root Directory**: `dashboard`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **SPA Routing**: Configured via `dashboard/vercel.json`
- **Environment Variables**: `REACT_APP_API_URL`, `REACT_APP_FRONTEND_URL`

