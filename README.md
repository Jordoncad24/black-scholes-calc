# Touchstone Advisory Black-Scholes Calculator

## Overview

This Black Scholes Calculator was part of a coding challenge provided to me by Touchstone Advisory. It consists of a Front end made in TypeScript and React and a Backend made in Python using FastAPI.

## Features
- **Black-Scholes Calculations**: Calculate European call and put option prices based on the Black-Scholes formula.
- **History**: View past calculations and store them for later reference. You are also able to sort the various results by Ascending or Descending parameters, as well as delete specific results too.
- **Formula Explanation**: The app provides a detailed explanation of the Black-Scholes formula and its variables.

## Assumptions Made During Development
- **Foundational Knowledge** The user already has a fundemental understanding of the Black Scholes formula. However, there is an about page that goes over the history of it and how it can be used to provide a smoother user experience.

- **Market Conditions**: The app assumes constant volatility and interest rates during the life of the option.



## Prerequisites

Before running this application, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (Version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Python](https://www.python.org/) (for the backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)

## Running the Application Locally

### Frontend (React + TypeScript)
1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Frontend Application**:
    ```bash
    npm start
    ```

    This will start the React development server on `http://localhost:3000`.

### Backend (FastAPI + Python)
1. **Navigate to the backend directory** (if separated):
    ```bash
    cd backend
    ```

2. **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    ```

3. **Activate the Virtual Environment**:
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

4. **Install Backend Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5. **Run the Backend Server**:
    ```bash
    uvicorn main:app --reload
    ```

    This will start the FastAPI server on `http://localhost:8000`.

### Database
If you are using a database to store calculation history, ensure that the database is properly set up and the connection strings are configured in the backend environment.

### Access the Application
Once both the frontend and backend servers are running, you can access the application at:
- **Frontend**: `http://localhost:3000`
- **Backend** (API): `http://localhost:8000`
