import React, { useState } from "react";
import { calculateBlackScholes } from "../services/apiService.tsx"; // adjust path if needed

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
    } catch (error) {
      setError("Failed to calculate Black-Scholes prices.");
    }
  };

  return (
    <div>
      <h1>Black-Scholes Calculator</h1>
      <div>
        <input
          type="number"
          value={S0}
          onChange={(e) => setS0(Number(e.target.value))}
          placeholder="S0 (underlying price)"
        />
        <input
          type="number"
          value={X}
          onChange={(e) => setX(Number(e.target.value))}
          placeholder="X (strike price)"
        />
        <input
          type="number"
          value={T}
          onChange={(e) => setT(Number(e.target.value))}
          placeholder="T (time to expiration)"
        />
        <input
          type="number"
          value={sigma}
          onChange={(e) => setSigma(Number(e.target.value))}
          placeholder="Sigma (volatility)"
        />
        <input
          type="number"
          value={r}
          onChange={(e) => setR(Number(e.target.value))}
          placeholder="r (risk-free rate)"
        />
        <input
          type="number"
          value={dividend_yield}
          onChange={(e) => setDividendYield(Number(e.target.value))}
          placeholder="Dividend Yield"
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {callPrice !== null && putPrice !== null && (
        <div>
          <h2>Results</h2>
          <p>Call Price: {callPrice.toFixed(2)}</p>
          <p>Put Price: {putPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default BlackScholesCalculator;
