# models.py
from sqlalchemy import Column, Integer, Float
from .database import Base

class Calculation(Base):
    __tablename__ = "calculations"
    
    id = Column(Integer, primary_key=True, index=True)
    S0 = Column(Float)
    X = Column(Float)
    r = Column(Float)
    T = Column(Float)
    sigma = Column(Float)
    dividend_yield = Column(Float, default=0.0)
    call_price = Column(Float)
    put_price = Column(Float)
