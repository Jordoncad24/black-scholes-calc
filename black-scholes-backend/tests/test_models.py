from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.models import Calculation
from app import crud, schemas
from fastapi.testclient import TestClient
import pytest

# Set up in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    # Create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    yield db
    db.close()
    # Drop tables after test
    Base.metadata.drop_all(bind=engine)

def test_store_calculation(db_session):
    # Given a Black-Scholes input
    data = schemas.BlackScholesInput(
        S0=100, X=95, r=0.05, T=1, sigma=0.2, dividend_yield=0.0
    )
    
    # Call the CRUD function to store the calculation
    call_price, put_price = crud.calculate_black_scholes(
        data.S0, data.X, data.r, data.T, data.sigma, data.dividend_yield
    )
    crud.store_calculation(db_session, data, call_price, put_price)

    # Fetch the stored calculation and verify
    result = db_session.query(Calculation).first()
    assert result is not None
    assert result.S0 == 100
    assert result.X == 95
    assert result.call_price == call_price
    assert result.put_price == put_price

def test_get_calculation_history(db_session):
    # Store a calculation
    data = schemas.BlackScholesInput(
        S0=100, X=95, r=0.05, T=1, sigma=0.2, dividend_yield=0.0
    )
    call_price, put_price = crud.calculate_black_scholes(
        data.S0, data.X, data.r, data.T, data.sigma, data.dividend_yield
    )
    crud.store_calculation(db_session, data, call_price, put_price)

    # Fetch the history
    history = crud.get_calculation_history(db_session)
    assert len(history) > 0
    assert history[0].S0 == 100
    assert history[0].X == 95

def test_delete_calculation_by_id(db_session):
    # Store a calculation
    data = schemas.BlackScholesInput(
        S0=100, X=95, r=0.05, T=1, sigma=0.2, dividend_yield=0.0
    )
    call_price, put_price = crud.calculate_black_scholes(
        data.S0, data.X, data.r, data.T, data.sigma, data.dividend_yield
    )
    crud.store_calculation(db_session, data, call_price, put_price)

    # Delete the calculation
    calculation = db_session.query(Calculation).first()
    crud.delete_calculation_by_id(db_session, calculation.id)

    # Verify deletion
    result = db_session.query(Calculation).first()
    assert result is None
