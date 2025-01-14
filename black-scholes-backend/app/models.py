from datetime import datetime, timezone
from sqlalchemy import Column, Integer, Float, DateTime
from app.database import Base

class Calculation(Base):
    __tablename__ = "calculations"
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    S0 = Column(Float)
    X = Column(Float)
    r = Column(Float)
    T = Column(Float)
    sigma = Column(Float)
    dividend_yield = Column(Float, default=0.0)
    call_price = Column(Float)
    put_price = Column(Float)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
