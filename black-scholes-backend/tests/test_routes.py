from fastapi.testclient import TestClient
from app.main import app
from app import crud, schemas
from app.database import SessionLocal, Base, create_tables
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest

# Set up in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def client():
    # Create tables before tests
    create_tables()
    client = TestClient(app)
    yield client
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

def test_calculate_black_scholes(client):
    data = {
        "S0": 100,
        "X": 95,
        "r": 0.05,
        "T": 1,
        "sigma": 0.2,
        "dividend_yield": 0.0
    }
    
    response = client.post("/calculate", json=data)
    assert response.status_code == 200
    assert "call_price" in response.json()
    assert "put_price" in response.json()

def test_get_history(client):
    response = client.get("/history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_clear_calculations(client):
    response = client.delete("/clear")
    assert response.status_code == 200
    assert response.json() == {"message": "All calculations cleared."}

def test_delete_history_record(client):
    # Store a calculation to test deletion
    data = {
        "S0": 100,
        "X": 95,
        "r": 0.05,
        "T": 1,
        "sigma": 0.2,
        "dividend_yield": 0.0
    }
    client.post("/calculate", json=data)
    calculation_id = 1  # Replace with the actual ID of the calculation stored in the database
    
    response = client.delete(f"/history/{calculation_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Record deleted successfully"}
