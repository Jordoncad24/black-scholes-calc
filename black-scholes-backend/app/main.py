from fastapi import FastAPI
from app.database import Base, engine
from app.routes import calculate_router

# Initialize FastAPI app
app = FastAPI()

# Create database tables (if running for the first time)
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(calculate_router, prefix="/api/v1", tags=["Black-Scholes Calculator"])
