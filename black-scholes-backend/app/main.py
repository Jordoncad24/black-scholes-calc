from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import calculate_router

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace '*' with your frontend's URL in production, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (e.g., POST, GET, OPTIONS)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(calculate_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Black-Scholes API"}

