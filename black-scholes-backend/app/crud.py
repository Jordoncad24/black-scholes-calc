# crud.py
import math
from scipy.stats import norm
from sqlalchemy.orm import Session
from . import models, schemas

def calculate_black_scholes(S0, X, r, T, sigma, dividend_yield):
    
    # Calculate d1 and d2
    d1 = (math.log(S0 / X) + (r - dividend_yield + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
    d2 = d1 - sigma * math.sqrt(T)
    
    # Calculate call and put prices
    call_price = S0 * math.exp(-dividend_yield * T) * norm.cdf(d1) - X * math.exp(-r * T) * norm.cdf(d2)
    put_price = X * math.exp(-r * T) * norm.cdf(-d2) - S0 * math.exp(-dividend_yield * T) * norm.cdf(-d1)
    
    # Round prices to 2 decimal places
    return round(call_price, 2), round(put_price, 2)

def store_calculation(db: Session, data: schemas.BlackScholesInput, call_price: float, put_price: float):
    db_calculation = models.Calculation(
        S0=data.S0,
        X=data.X,
        r=data.r,
        T=data.T,
        sigma=data.sigma,
        dividend_yield=data.dividend_yield,
        call_price=call_price,
        put_price=put_price
    )
    db.add(db_calculation)
    db.commit()
    db.refresh(db_calculation)
    return db_calculation

# Fetch calculation history from the database
def get_calculation_history(db: Session):
    return db.query(models.Calculation).all()