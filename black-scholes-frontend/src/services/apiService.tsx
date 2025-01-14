import axios from "axios";

// Base URL for the backend
const API_BASE_URL = "http://localhost:8000";

/**
 * Calculate Black-Scholes prices.
 * @param inputs - The inputs required for Black-Scholes calculation.
 * @returns A promise resolving to call and put prices.
 */
export const calculateBlackScholes = async (inputs: { S: number; K: number; T: number; sigma: number; r: number; q: number }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate`, {
      S0: inputs.S,
      X: inputs.K,
      T: inputs.T,
      sigma: inputs.sigma,
      r: inputs.r,
      dividend_yield: inputs.q,  // Map q to dividend_yield
    });
    return response.data;
  } catch (error: any) {
    console.error("Error calculating Black-Scholes:", error);
    throw new Error("Failed to calculate Black-Scholes prices.");
  }
};

/**
 * Fetch calculation history.
 * @returns A promise resolving to the list of previous calculations.
 */
export const fetchHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching history:", error);
    throw new Error("Failed to fetch calculation history.");
  }
};

export const clearHistory = async () => {
  await axios.delete(`${API_BASE_URL}/clear`);
};

// Function to delete a record by ID
export const deleteRecord = async (id: number) => {
  try {
    // Sending DELETE request to delete the record
    await axios.delete(`${API_BASE_URL}/history/${id}`);
  } catch (error) {
    throw new Error(`Error deleting record with ID: ${id}`);
  }
};