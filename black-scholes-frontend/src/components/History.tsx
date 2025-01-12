import React, { useEffect, useState } from "react";
import { fetchHistory } from "../services/apiService";

interface Calculation {
  id: number;
  S: number;
  K: number;
  T: number;
  sigma: number;
  r: number;
  q: number;
  call_price: number;
  put_price: number;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<Calculation[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (error) {
        alert(error.message);
      }
    };

    loadHistory();
  }, []);

  return (
    <div>
      <h2>Calculation History</h2>
      <table>
        <thead>
          <tr>
            <th>Stock Price</th>
            <th>Strike Price</th>
            <th>Time to Expiration</th>
            <th>Volatility</th>
            <th>Risk-Free Rate</th>
            <th>Dividend Yield</th>
            <th>Call Price</th>
            <th>Put Price</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.S}</td>
              <td>{entry.K}</td>
              <td>{entry.T}</td>
              <td>{entry.sigma}</td>
              <td>{entry.r}</td>
              <td>{entry.q}</td>
              <td>{entry.call_price.toFixed(2)}</td>
              <td>{entry.put_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
