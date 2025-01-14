import { render, screen, fireEvent } from '@testing-library/react';
import BlackScholesForm from '../components/BlackScholesForm.tsx'; // Import the BlackScholesForm component
import '@testing-library/jest-dom';
import test from 'node:test';
import React from 'react';

test('renders Black-Scholes form fields', () => {
  render(<BlackScholesForm />);
  expect(screen.getByLabelText(/S0/i)); // Check if the field is present
  expect(screen.getByLabelText(/X/i));
  expect(screen.getByLabelText(/r/i));
  expect(screen.getByLabelText(/T/i));
  expect(screen.getByLabelText(/sigma/i));
  expect(screen.getByLabelText(/dividend yield/i));
});

test('calls the submit function when form is submitted', () => {
  render(<BlackScholesForm />);
  fireEvent.change(screen.getByLabelText(/S0/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText(/Submit/i));

  // Check if the form submission logic works
  expect(screen.getByText(/Calculating.../i)); // Expect a loading state
});
function expect(arg0: any) {
    throw new Error('Function not implemented.');
}

