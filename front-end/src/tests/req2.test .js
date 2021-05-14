import React from 'react';
import renderWithRouter from './renderWithRouter';
import Register from '../pages/Register';

import Provider from '../context/Provider';
import { fireEvent } from '@testing-library/dom';
import { cleanup, waitForElement } from '@testing-library/react';

import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';

import jwtDecode from 'jwt-decode';

const registeredUser = {
  email: "test@teste.com.br",
  password:"123456"
}

const unregisteredUser = {
  username: "joao checoli castro",
  email: "johnny@gmail.com",
  password: "123456"
}

const admin = {
  email: "admin@teste.com.br",
  password:"123456"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3JhbWVyIGRlIGtyYW1lciBrcmFtZXIiLCJlbWFpbCI6ImtyYW1lcnNjc0BnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjIxMDI5ODgyLCJleHAiOjE2MjEwMzEwODJ9.u3c8tMLX60v5vOyh7MJrSL7JDpEB47GAHDGcAPcu6hw"

// beforeEach(cleanup)
// afterEach(cleanup);
// afterEach(() => jest.clearAllMocks());

test('checks if the elements are visible according prototype', () => {
  const { getByTestId } = renderWithRouter(<Provider><Register /></Provider>);
  const nameInput = getByTestId("signup-name")
  const emailInput = getByTestId("signup-email")
  const passwordInput = getByTestId("signup-password")
  const checkButton = getByTestId("signup-seller")
  const registerButton = getByTestId("signup-btn")
  
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(checkButton).toBeInTheDocument();

  expect(registerButton).toBeInTheDocument();
});

// test('filling forms input with a valid email and password enables entry button', () => {
//   const { getByTestId } = renderWithRouter(<Provider><Login /></Provider>);
//   const emailInput = getByTestId("email-input")
//   const passwordInput = getByTestId("password-input")
//   const entryButton = getByTestId("signin-btn")
  

//   fireEvent.change(emailInput, { target: { value: user.email }})
//   expect(emailInput).toHaveValue(user.email)

//   fireEvent.change(passwordInput, { target: { value: user.password }})
//   expect(passwordInput).toHaveValue(user.password)

//   expect(entryButton).not.toHaveAttribute('disabled')

// });

// test('unregistered user login', async () => {
//   const { getByTestId  } = renderWithRouter(<Provider><Login /></Provider>);
//   axiosMock.post.mockResolvedValueOnce({ data: { message: "Incorrect email or password" }, status: 400 })
//   const emailInput = getByTestId("email-input")
//   const passwordInput = getByTestId("password-input")
//   const entryButton = getByTestId("signin-btn")
  

//   fireEvent.change(emailInput, { target: { value: user.email }})
//   expect(emailInput).toHaveValue(user.email)

//   fireEvent.change(passwordInput, { target: { value: user.password }})
//   expect(passwordInput).toHaveValue(user.password)

//   act(() => {
//     fireEvent.click(entryButton)
//     expect(axiosMock.post).toHaveBeenCalledTimes(1)
//   })

//   const errorMessage = await waitForElement(() => getByTestId("error-message"))
//   expect(errorMessage).toHaveTextContent("Incorrect email or password")
// });

// test('registered user login', async () => {
//   const { getByTestId, history  } = renderWithRouter(<Provider><Login /></Provider>);
//   axiosMock.post.mockResolvedValueOnce({ data: { token }, status: 200 })
//   const emailInput = getByTestId("email-input")
//   const passwordInput = getByTestId("password-input")
//   const entryButton = getByTestId("signin-btn")
  

//   fireEvent.change(emailInput, { target: { value: user.email }})
//   fireEvent.change(passwordInput, { target: { value: user.password }})


//   act(() => {
//     fireEvent.change(emailInput, { target: { value: user.email }})
//     fireEvent.change(passwordInput, { target: { value: user.password }})
//     fireEvent.click(entryButton)
//   })

//   const title = await waitForElement(() => getByTestId("error-message"))
//   expect(title).toHaveTextContent("")

//   const pathname = history.location.pathname;
//   expect(pathname).toBe('/products')

// });

// test('fire does not have account', async () => {
//   const { getByTestId, history  } = renderWithRouter(<Provider><Login /></Provider>);
//   const checkButton = getByTestId("no-account-btn")

//   fireEvent.click(checkButton)

//   const pathname = history.location.pathname;
//   expect(pathname).toBe('/register')
  

// });




