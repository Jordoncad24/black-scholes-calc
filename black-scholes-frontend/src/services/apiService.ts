import axios from "axios";

// Base URL for the backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

/**
 * Calculate Black-Scholes prices.
 * @param inputs - The inputs required for Black-Scholes calculation.
 * @returns A promise resolving to call and put prices.
 */
export const calculateBlackScholes = async (inputs: {
  S: number;
  K: number;
  T: number;
  sigma: number;
  r: number;
  q: number;
}) => {
try {
    const response = await axios.post(`${API_BASE_URL}/calculate`, inputs);
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
