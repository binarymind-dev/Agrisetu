"""FastAPI wrapper exposing the price forecasting model as an endpoint."""
from fastapi import FastAPI
from model import get_advisory

app = FastAPI(title="AgriSetu Forecasting Service")

@app.get("/advisory")
def advisory(crop: str, market: str = "default"):
    return get_advisory(crop, market)

@app.get("/")
def root():
    return {"status": "forecasting-service running"}
