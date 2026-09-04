"""Runs fetch_prices() on a schedule using APScheduler."""
from apscheduler.schedulers.blocking import BlockingScheduler
from fetch_prices import fetch_prices

scheduler = BlockingScheduler()
scheduler.add_job(fetch_prices, "interval", hours=6)

if __name__ == "__main__":
    print("Starting price ingestion scheduler (every 6 hours)...")
    scheduler.start()
