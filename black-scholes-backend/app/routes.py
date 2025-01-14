from fastapi import APIRouter, Depends, HTTPException
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
    print("Fetched history:", history)
    return history

@calculate_router.delete("/clear")
def clear_calculations(db: Session = Depends(get_db)):
    crud.clear_all_calculations(db)
    return {"message": "All calculations cleared."}

@calculate_router.delete("/history/{id}")
def delete_history_record(id: int, db: Session = Depends(get_db)):
    try:
        # Call the CRUD function to delete the record
        crud.delete_calculation_by_id(db, id)
        return {"message": "Record deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))