import React from 'react';
import renderWithRouter from './renderWithRouter';
import Products from '../pages/Client/Products';
import Orders from '../pages/Client/Orders';

import Provider from '../context/Provider';
import { fireEvent } from '@testing-library/dom';
import { cleanup, waitForElement } from '@testing-library/react';

import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';

import jwtDecode from 'jwt-decode';

const mockData = [{
  id: 1,
  name: "skol",
  price: 10,
  image: "image"
}]

const mockOrders = [{
  id: 1,
  saleDate: "12/02/1983",
  totalPrice: 10
}]

const user = {
  email: "test@teste.com.br",
  password:"123456"
}

const admin = {
  email: "admin@teste.com.br",
  password:"123456"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3JhbWVyIGRlIGtyYW1lciBrcmFtZXIiLCJlbWFpbCI6ImtyYW1lcnNjc0BnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjIxMDI5ODgyLCJleHAiOjE2MjEwMzEwODJ9.u3c8tMLX60v5vOyh7MJrSL7JDpEB47GAHDGcAPcu6hw"

beforeEach(cleanup)
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());


describe('Task 3', () => {

  it('checks if the elements are visible according prototype in products screen', async () => {
    const { getByTestId } = renderWithRouter(<Provider><Products /></Provider>);
    
    act(() => {
      axiosMock.get.mockResolvedValueOnce({ data: mockData })
      expect(axiosMock.get).toHaveBeenCalledTimes(1)
        })
      
      const hamburguer = await waitForElement(() => getByTestId("top-hamburguer"))
      const title = await waitForElement(() => getByTestId("top-title"))

      expect(hamburguer).toBeInTheDocument();
      expect(title).toBeInTheDocument();

  });

  it('checks if the elements are visible according prototype in orders screen', async () => {
    const { getByTestId, getByText } = renderWithRouter(<Provider><Orders /></Provider>);
    
    act(() => {
      axiosMock.get.mockResolvedValueOnce({ data: mockOrders })
      expect(axiosMock.get).toHaveBeenCalledTimes(1)

    })
      
      const loading = await waitForElement(() => getByText("Loading..."))
      expect(loading).toBeInTheDocument();
    
  });

  // it('filling forms input with a valid email and password enables entry button', () => {
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

  // it('unregistered user login', async () => {
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

  // it('registered user login', async () => {
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

  // it('fire does not have account', async () => {
  //   const { getByTestId, history  } = renderWithRouter(<Provider><Login /></Provider>);
  //   const checkButton = getByTestId("no-account-btn")

  //   fireEvent.click(checkButton)

  //   const pathname = history.location.pathname;
  //   expect(pathname).toBe('/register')

  // });
});

