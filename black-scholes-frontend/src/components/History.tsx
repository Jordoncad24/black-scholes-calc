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
  created_at: string; // Timestamp from backend
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
        setError('Error fetching history.');
      }
    };

    getHistory();
  }, []);

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  return (
    <div>
      <h2>Calculation History</h2>
      {error && <p>{error}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>S0</th>
            <th style={thStyle}>X</th>
            <th style={thStyle}>r</th>
            <th style={thStyle}>T</th>
            <th style={thStyle}>Sigma</th>
            <th style={thStyle}>Dividend Yield</th>
            <th style={thStyle}>Call Price</th>
            <th style={thStyle}>Put Price</th>
            <th style={thStyle}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((calc) => {
              // Add console.log to debug the created_at value
              console.log('Created At:', calc.created_at);  // Debugging line
              return (
                <tr key={calc.id}>
                  <td style={tdStyle}>{calc.id}</td>
                  <td style={tdStyle}>{calc.S0}</td>
                  <td style={tdStyle}>{calc.X}</td>
                  <td style={tdStyle}>{calc.r}</td>
                  <td style={tdStyle}>{calc.T}</td>
                  <td style={tdStyle}>{calc.sigma}</td>
                  <td style={tdStyle}>{calc.dividend_yield}</td>
                  <td style={tdStyle}>{calc.call_price}</td>
                  <td style={tdStyle}>{calc.put_price}</td>
                  <td style={tdStyle}>
                    {/* Check and format the created_at date */}
                    {calc.created_at ? (
                      new Date(calc.created_at).toLocaleString()
                    ) : (
                      'Invalid Date'
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} style={tdStyle}>
                No calculations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
