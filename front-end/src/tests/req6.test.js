import React from 'react';
import renderWithRouter from './renderWithRouter';
import Checkout from '../pages/Client/Checkout';


import Provider from '../context/Provider';
import { fireEvent } from '@testing-library/dom';
import { cleanup, waitForElement } from '@testing-library/react';

import axiosMock from 'axios';
import { act } from 'react-dom/test-utils';

import jwtDecode from 'jwt-decode';

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


describe('Task 1', () => {

  it('checks if the elements are visible according prototype in checkout screnn', () => {
    const { getByTestId } = renderWithRouter(<Provider><Checkout /></Provider>);
    const street = getByTestId("checkout-street-input")
    const houseNumber = getByTestId("checkout-house-number-input")

    expect(street).toBeInTheDocument();
    expect(houseNumber).toBeInTheDocument();
  });

  
});