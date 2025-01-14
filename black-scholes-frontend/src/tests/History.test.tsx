import { render, screen, fireEvent } from '@testing-library/react';
import History from '../components/History'; // Import the History component
import '@testing-library/jest-dom';
import test from 'node:test';
import React from 'react';

test('renders history table', () => {
  render(<History />);
  expect(screen.getByText(/Calculation History/i)) // Header text
  expect(screen.getByText(/ID/i)); // Table header
  expect(screen.getByText(/S0/i)); // Another table header
});

test('deletes a record when delete button is clicked', () => {
  render(<History />);
  fireEvent.click(screen.getByText(/Delete Record/i)); // Trigger the delete action
  expect(screen.getByText(/No calculations available/i)); // After deletion
});
function expect(arg0: any) {
    throw new Error('Function not implemented.');
}

