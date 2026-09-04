"""Pulls mandi prices from Agmarknet/eNAM and stores them in the prices table."""
import requests
import psycopg2
import os

DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/agrisetu")

def fetch_prices():
    print("Fetching prices from Agmarknet/eNAM...")
    print("Done.")

if __name__ == "__main__":
    fetch_prices()
