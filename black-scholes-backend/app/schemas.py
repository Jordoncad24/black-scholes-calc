from pydantic import BaseModel

# Schema for input data to calculate Black-Scholes
class BlackScholesInput(BaseModel):
    S0: float
    X: float
    r: float
    T: float
    sigma: float
    dividend_yield: float = 0.0  # Default value for dividend_yield

# Schema for calculation history response data
class CalculationHistory(BaseModel):
    S0: float
    X: float
    r: float
    T: float
    sigma: float
    dividend_yield: float
    call_price: float
    put_price: float

    class Config:
        orm_mode = True  # Allow conversion from SQLAlchemy model to Pydantic model
