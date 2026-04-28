import logging
import time
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("finops-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Cloud Cost Anomaly Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/anomalies")
def get_anomalies():
    # Mock anomaly data
    return [
        {
            "id": 1,
            "cloud": "Azure",
            "service": "Virtual Machines",
            "cost_spike": 1250.50,
            "detected_at": "2026-04-28T09:00:00Z",
            "status": "active",
            "severity": "high"
        },
        {
            "id": 2,
            "cloud": "AWS",
            "service": "Lambda",
            "cost_spike": 450.20,
            "detected_at": "2026-04-27T14:30:00Z",
            "status": "investigating",
            "severity": "medium"
        }
    ]

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_monthly_spend": 145000.00,
        "active_anomalies": 4,
        "forecasted_overrun": 12000.00,
        "potential_savings": 8500.00
    }
