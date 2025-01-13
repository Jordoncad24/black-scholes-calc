import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/apiService.tsx';

interface CalculationHistory {
  id: number;
  S0: number;
  X: number;
  r: number;
  T: number;
  sigma: number;
  dividend_yield: number;
  call_price: number;
  put_price: number;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const historyData = await fetchHistory();
        setHistory(historyData);
      } catch (error) {
        setError("Error fetching history.");
      }
    };

    getHistory();
  }, []);

  return (
    <div>
      <h2>Calculation History</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>S0</th>
            <th>X</th>
            <th>r</th>
            <th>T</th>
            <th>Sigma</th>
            <th>Dividend Yield</th>
            <th>Call Price</th>
            <th>Put Price</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((calc) => (
              <tr key={calc.id}>
                <td>{calc.id}</td>
                <td>{calc.S0}</td>
                <td>{calc.X}</td>
                <td>{calc.r}</td>
                <td>{calc.T}</td>
                <td>{calc.sigma}</td>
                <td>{calc.dividend_yield}</td>
                <td>{calc.call_price}</td>
                <td>{calc.put_price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No calculations available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
