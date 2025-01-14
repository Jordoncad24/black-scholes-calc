import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; // Import the main App component
import '@testing-library/jest-dom';
import test from 'node:test';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

test('renders the calculator tab initially', () => {
  render(<App />);
  expect(screen.getByText(/Calculator/i));
});

test('renders the history tab when clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/History/i));
  expect(screen.getByText(/History/i));
});

test('displays error boundary message when there is an error', () => {
  const FaultyComponent = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <FaultyComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText(/Something went wrong/i));
});
function expect(arg0: any) {
  throw new Error('Function not implemented.');
}

