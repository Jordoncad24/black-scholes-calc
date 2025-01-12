# schemas.py
from pydantic import BaseModel

class BlackScholesInput(BaseModel):
    S0: float  # Current stock price
    X: float   # Strike price
    r: float   # Risk-free interest rate
    T: float   # Time to maturity in years
    sigma: float  # Volatility
    dividend_yield: float = 0.0  # Optional dividend yield
