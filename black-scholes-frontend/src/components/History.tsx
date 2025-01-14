import React, { useEffect, useState } from 'react';
import { fetchHistory, clearHistory, deleteRecord } from '../services/apiService.tsx';

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

type SortOrder = 'asc' | 'desc';

const History: React.FC = () => {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string | null>(null);  // Error message state
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof CalculationHistory; order: SortOrder } | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);  // Track the selected record ID
  const [showPrompt, setShowPrompt] = useState(false);  // Control prompt visibility
  const [recordIdToDelete, setRecordIdToDelete] = useState<number | null>(null);  // Store the ID entered in the prompt

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

  const handleSort = (key: keyof CalculationHistory) => {
    let order: SortOrder = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });

    const sortedHistory = [...history].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setHistory(sortedHistory);
  };

  const handleClearHistory = async () => {
    setIsLoading(true);
    try {
      await clearHistory(); // Call the API to clear history
      setHistory([]); // Clear the state immediately
    } catch (error) {
      setError('Error clearing history.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecord = async () => {
    if (selectedRecordId !== null) {
      try {
        await deleteRecord(selectedRecordId); // Call the API to delete the record
        setHistory(history.filter(record => record.id !== selectedRecordId));  // Remove the record from the table
        setSelectedRecordId(null);  // Reset selected record ID
      } catch (error) {
        setError('Error deleting record.');
      }
    } else if (recordIdToDelete !== null) {
      try {
        await deleteRecord(recordIdToDelete); // Call the API to delete the record
        setHistory(history.filter(record => record.id !== recordIdToDelete));  // Remove the record from the table
        setRecordIdToDelete(null);  // Reset the ID to delete
      } catch (error) {
        setError('Error deleting record.');
      }
    } else {
      setError('Please select or enter a record ID to delete.');
    }
  };

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  // Error modal styles
  const modalStyle: React.CSSProperties = {
    display: error ? 'block' : 'none',  // Only show the modal if there's an error
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    border: '1px solid #ddd',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };

  const modalBackgroundStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  return (
    <div>
      <h2>Calculation History</h2>
      {error && (
        <>
          <div style={modalBackgroundStyle} onClick={() => setError(null)} />
          <div style={modalStyle}>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Close</button>
          </div>
        </>
      )}
      <button onClick={handleClearHistory} disabled={isLoading}>
        {isLoading ? 'Clearing...' : 'Clear History'}
      </button>
      <button onClick={() => setShowPrompt(true)} disabled={isLoading}>
        Delete Selected Record or Enter ID
      </button>
      {showPrompt && (
        <div>
          <input
            type="text" // Changed to text input to remove number arrows
            value={recordIdToDelete || ''}
            onChange={(e) => {
              // Only allow numeric input
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setRecordIdToDelete(value === '' ? null : Number(value));
              }
            }}
            placeholder="Enter record ID"
          />
          <button onClick={handleDeleteRecord}>Delete Record</button>
          <button onClick={() => setShowPrompt(false)}>Cancel</button>
        </div>
      )}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleSort('id')}>ID</th>
            <th style={thStyle} onClick={() => handleSort('S0')}>S0</th>
            <th style={thStyle} onClick={() => handleSort('X')}>X</th>
            <th style={thStyle} onClick={() => handleSort('r')}>r</th>
            <th style={thStyle} onClick={() => handleSort('T')}>T</th>
            <th style={thStyle} onClick={() => handleSort('sigma')}>Sigma</th>
            <th style={thStyle} onClick={() => handleSort('dividend_yield')}>Dividend Yield</th>
            <th style={thStyle} onClick={() => handleSort('call_price')}>Call Price</th>
            <th style={thStyle} onClick={() => handleSort('put_price')}>Put Price</th>
            <th style={thStyle} onClick={() => handleSort('created_at')}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((calc) => (
              <tr 
                key={calc.id} 
                onClick={() => setSelectedRecordId(calc.id)} 
                style={{ backgroundColor: selectedRecordId === calc.id ? 'lightgray' : 'white' }}
              >
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
                  {calc.created_at ? new Date(calc.created_at).toLocaleString() : 'Invalid Date'}
                </td>
              </tr>
            ))
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
