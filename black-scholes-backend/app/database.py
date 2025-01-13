from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from sqlalchemy.orm import Session

# Declare the Base for model inheritance
Base = declarative_base()

# SQLite URL (this will create a local file 'test.db')
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create the engine to connect to the database
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session
def get_db() -> Session:
    db = SessionLocal()  # Get a session object
    try:
        yield db  # Yield the session so FastAPI can use it in the route
    finally:
        db.close()  # Ensure the session is closed after use

# This line ensures that the tables are created in the database (if they don't exist already)
def create_tables():
    Base.metadata.create_all(bind=engine)

# Call create_tables() at the start to create tables when the app starts
create_tables()
