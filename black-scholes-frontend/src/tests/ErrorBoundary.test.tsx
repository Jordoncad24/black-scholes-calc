import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary'; // Import the ErrorBoundary component
import test from 'node:test';
import React from 'react';

test('displays fallback UI when there is an error', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText(/Something went wrong/i));
});
function expect(arg0: any) {
    throw new Error('Function not implemented.');
}

