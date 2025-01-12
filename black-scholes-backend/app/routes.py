from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, crud

# Create a router instance
calculate_router = APIRouter()

@calculate_router.post("/calculate")
def calculate_black_scholes(
    data: schemas.BlackScholesInput, db: Session = Depends(get_db)
):
    # Perform Black-Scholes calculation
    call_price, put_price = crud.calculate_black_scholes(
        data.S0, data.X, data.r, data.T, data.sigma, data.dividend_yield
    )

    # Store the result in the database
    crud.store_calculation(db, data, call_price, put_price)

    return {"call_price": call_price, "put_price": put_price}
