import React, { useState } from "react";
import { calculateBlackScholes } from "../services/apiService";

const BlackScholesForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    S: "",
    K: "",
    T: "",
    sigma: "",
    r: "",
    q: "",
  });
  const [results, setResults] = useState<{ callPrice: number; putPrice: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await calculateBlackScholes({
        S: parseFloat(inputs.S),
        K: parseFloat(inputs.K),
        T: parseFloat(inputs.T),
        sigma: parseFloat(inputs.sigma),
        r: parseFloat(inputs.r),
        q: parseFloat(inputs.q),
      });
      setResults(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Black-Scholes Calculator</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(inputs).map((key) => (
          <div key={key}>
            <label>
              {key}: 
              <input
                type="number"
                name={key}
                value={(inputs as any)[key]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Calculate</button>
      </form>

      {results && (
        <div>
          <h3>Results:</h3>
          <p>Call Price: {results.callPrice.toFixed(2)}</p>
          <p>Put Price: {results.putPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default BlackScholesForm;
