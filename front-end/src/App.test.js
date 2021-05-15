import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import renderWithRouter from './tests/renderWithRouter'

import Provider from './context/Provider'

test('renders learn react link', () => {
  const { getByTestId } = renderWithRouter(<Provider><App /></Provider>);
  const emailInput = getByTestId("email-input")
  const passwordInput = getByTestId("password-input")
  const entryButton = getByTestId("signin-btn")
  const checkButton = getByTestId("no-account-btn")

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(entryButton).toBeInTheDocument();
  expect(checkButton).toBeInTheDocument();
});
