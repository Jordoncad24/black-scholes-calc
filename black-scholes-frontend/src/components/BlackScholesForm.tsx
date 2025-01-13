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
    } catch (error) {
      setError("Failed to calculate Black-Scholes prices.");
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

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Black-Scholes Calculator</h1>
      <div>
        <label>
          Underlying Asset Price (S0):
          <input
            style={inputStyle}
            type="number"
            value={S0}
            onChange={(e) => setS0(Number(e.target.value))}
            placeholder="Enter underlying asset price"
          />
        </label>
        <label>
          Strike Price (X):
          <input
            style={inputStyle}
            type="number"
            value={X}
            onChange={(e) => setX(Number(e.target.value))}
            placeholder="Enter strike price"
          />
        </label>
        <label>
          Time to Expiration (T):
          <input
            style={inputStyle}
            type="number"
            value={T}
            onChange={(e) => setT(Number(e.target.value))}
            placeholder="Enter time to expiration (years)"
          />
        </label>
        <label>
          Volatility (σ):
          <input
            style={inputStyle}
            type="number"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            placeholder="Enter volatility (e.g., 0.2)"
          />
        </label>
        <label>
          Risk-Free Rate (r):
          <input
            style={inputStyle}
            type="number"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            placeholder="Enter risk-free rate (e.g., 0.05)"
          />
        </label>
        <label>
          Dividend Yield (q):
          <input
            style={inputStyle}
            type="number"
            value={dividend_yield}
            onChange={(e) => setDividendYield(Number(e.target.value))}
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
    </div>
  );
};

export default BlackScholesCalculator;
