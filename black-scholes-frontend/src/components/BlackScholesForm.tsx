import React, { useState } from "react";
import { calculateBlackScholes } from "../services/apiService.tsx";

const BlackScholesCalculator = () => {
  const [S0, setS0] = useState<number>(100); // Underlying asset price
  const [X, setX] = useState<number>(95); // Strike price
  const [T, setT] = useState<number>(1); // Time to expiration
  const [sigma, setSigma] = useState<number>(0.2); // Volatility
  const [r, setR] = useState<number>(0.05); // Risk-free rate
  const [dividend_yield, setDividendYield] = useState<number>(0.03); // Dividend yield

  const [callPrice, setCallPrice] = useState<number | null>(null);
  const [putPrice, setPutPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]); // Store history of calculations
  const [notification, setNotification] = useState<string | null>(null); // Popup notification

  const handleCalculate = async () => {
    try {
      const result = await calculateBlackScholes({
        S: S0,
        K: X,
        T: T,
        sigma: sigma,
        r: r,
        q: dividend_yield,
      });

      setCallPrice(result.call_price);
      setPutPrice(result.put_price);
      setError(null); // Clear any previous error

      // Add new calculation to history with a unique ID (based on length of history)
      const newCalculation = {
        id: history.length + 1,
        S: S0,
        K: X,
        T: T,
        sigma: sigma,
        r: r,
        q: dividend_yield,
        call_price: result.call_price,
        put_price: result.put_price,
      };

      setHistory([...history, newCalculation]);

      // Show the notification with the calculation ID
      setNotification(`Calculation added to history with ID #${newCalculation.id}`);

      // Reset the notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);

    } catch (error) {
      setError("Failed to calculate Black-Scholes prices.");
      setNotification(null); // Reset notification on error
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string
  ) => {
    // Allow only numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value === "" ? 0 : parseFloat(value));
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const buttonStyle = {
    margin: "10px 0",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    marginTop: "10px",
  };

  const notificationStyle = {
    position: "fixed" as "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // Green background for success
    color: "#fff",
    borderRadius: "5px",
    zIndex: 9999,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Black-Scholes Calculator</h1>
      <div>
        <label>
          Underlying Asset Price (S0):
          <input
            style={inputStyle}
            type="text"
            value={S0}
            onChange={(e) => handleInputChange(setS0, e.target.value)}
            placeholder="Enter underlying asset price"
          />
        </label>
        <label>
          Strike Price (X):
          <input
            style={inputStyle}
            type="text"
            value={X}
            onChange={(e) => handleInputChange(setX, e.target.value)}
            placeholder="Enter strike price"
          />
        </label>
        <label>
          Time to Expiration (T):
          <input
            style={inputStyle}
            type="text"
            value={T}
            onChange={(e) => handleInputChange(setT, e.target.value)}
            placeholder="Enter time to expiration (years)"
          />
        </label>
        <label>
          Volatility (σ):
          <input
            style={inputStyle}
            type="text"
            value={sigma}
            onChange={(e) => handleInputChange(setSigma, e.target.value)}
            placeholder="Enter volatility (e.g., 0.2)"
          />
        </label>
        <label>
          Risk-Free Rate (r):
          <input
            style={inputStyle}
            type="text"
            value={r}
            onChange={(e) => handleInputChange(setR, e.target.value)}
            placeholder="Enter risk-free rate (e.g., 0.05)"
          />
        </label>
        <label>
          Dividend Yield (q):
          <input
            style={inputStyle}
            type="text"
            value={dividend_yield}
            onChange={(e) => handleInputChange(setDividendYield, e.target.value)}
            placeholder="Enter dividend yield (e.g., 0.03)"
          />
        </label>
      </div>
      <button style={buttonStyle} onClick={handleCalculate}>
        Calculate
      </button>

      {error && <div style={errorStyle}>{error}</div>}
      {callPrice !== null && putPrice !== null && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>
          <p>Call Price: {callPrice.toFixed(2)}</p>
          <p>Put Price: {putPrice.toFixed(2)}</p>
        </div>
      )}

      {notification && (
        <div style={notificationStyle}>{notification}</div>
      )}
    </div>
  );
};

export default BlackScholesCalculator;
