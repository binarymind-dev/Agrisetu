# AgriSetu

Farmer-buyer direct market linkage platform - SIH 26132.

## Quick Start

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

### Database
Import database/schema.sql into PostgreSQL, or run docker-compose up to spin up everything.

### Forecasting Service
cd forecasting-service
pip install -r requirements.txt
uvicorn app:app --reload
