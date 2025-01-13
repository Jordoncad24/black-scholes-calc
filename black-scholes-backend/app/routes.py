from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas

# Create a router instance
calculate_router = APIRouter()

@calculate_router.post("/calculate")
def calculate_black_scholes(data: schemas.BlackScholesInput, db: Session = Depends(get_db)):
    call_price, put_price = crud.calculate_black_scholes(
        data.S0, data.X, data.r, data.T, data.sigma, data.dividend_yield
    )
    crud.store_calculation(db, data, call_price, put_price)
    return {"call_price": call_price, "put_price": put_price}

@calculate_router.get("/history", response_model=list[schemas.CalculationHistory])
def get_history(db: Session = Depends(get_db)):
    history = crud.get_calculation_history(db)
    return history
