import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, Calculation
from app.crud import calculate_black_scholes, store_calculation, get_calculation_history, clear_all_calculations, delete_calculation_by_id
from app.schemas import BlackScholesInput
from datetime import datetime


# Setup a test database engine
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables for testing
Base.metadata.create_all(bind=engine)

@pytest.fixture
def db_session():
    # Create a new session for each test
    db = TestingSessionLocal()
    yield db
    db.close()

@pytest.fixture
def valid_input():
    return BlackScholesInput(S0=100, X=95, r=0.05, T=1, sigma=0.2, dividend_yield=0.03)


# Test calculate_black_scholes function
def test_calculate_black_scholes():
    call_price, put_price = calculate_black_scholes(100, 95, 0.05, 1, 0.2, 0.03)
    
    # Example expected values
    expected_call_price = 11.27  # These values should match what your function returns
    expected_put_price = 4.59
    
    assert round(call_price, 2) == expected_call_price
    assert round(put_price, 2) == expected_put_price


# Test store_calculation function
def test_store_calculation(db_session, valid_input):
    call_price, put_price = calculate_black_scholes(valid_input.S0, valid_input.X, valid_input.r, valid_input.T, valid_input.sigma, valid_input.dividend_yield)
    
    stored_calculation = store_calculation(db_session, valid_input, call_price, put_price)
    
    # Check if the stored calculation is in the database
    db_calculation = db_session.query(Calculation).filter(Calculation.id == stored_calculation.id).first()
    assert db_calculation is not None
    assert db_calculation.call_price == round(call_price, 2)
    assert db_calculation.put_price == round(put_price, 2)


# Test get_calculation_history function
def test_get_calculation_history(db_session, valid_input):
    call_price, put_price = calculate_black_scholes(valid_input.S0, valid_input.X, valid_input.r, valid_input.T, valid_input.sigma, valid_input.dividend_yield)
    store_calculation(db_session, valid_input, call_price, put_price)

    history = get_calculation_history(db_session)
    assert len(history) > 0  # There should be at least 1 calculation in history
    assert history[0].call_price == round(call_price, 2)
    assert history[0].put_price == round(put_price, 2)


# Test clear_all_calculations function
def test_clear_all_calculations(db_session, valid_input):
    call_price, put_price = calculate_black_scholes(valid_input.S0, valid_input.X, valid_input.r, valid_input.T, valid_input.sigma, valid_input.dividend_yield)
    store_calculation(db_session, valid_input, call_price, put_price)

    clear_all_calculations(db_session)
    history = get_calculation_history(db_session)
    
    assert len(history) == 0  # The database should be cleared


# Test delete_calculation_by_id function
def test_delete_calculation_by_id(db_session, valid_input):
    call_price, put_price = calculate_black_scholes(valid_input.S0, valid_input.X, valid_input.r, valid_input.T, valid_input.sigma, valid_input.dividend_yield)
    stored_calculation = store_calculation(db_session, valid_input, call_price, put_price)

    delete_calculation_by_id(db_session, stored_calculation.id)
    deleted_calculation = db_session.query(Calculation).filter(Calculation.id == stored_calculation.id).first()

    assert deleted_calculation is None  # The record should be deleted


# Test delete_calculation_by_id when record doesn't exist
def test_delete_calculation_by_nonexistent_id(db_session):
    try:
        delete_calculation_by_id(db_session, 9999)  # Trying to delete a non-existent ID
    except Exception as e:
        assert str(e) == "Record with ID 9999 not found."
