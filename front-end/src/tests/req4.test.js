import React from 'react';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Client/Profile';

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
  user_name: "joao checoli castro",
  email: "johnny@gmail.com",
  password: "123456"
}

const admin = {
  email: "admin@teste.com.br",
  password:"123456"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3JhbWVyIGRlIGtyYW1lciBrcmFtZXIiLCJlbWFpbCI6ImtyYW1lcnNjc0BnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjIxMDI5ODgyLCJleHAiOjE2MjEwMzEwODJ9.u3c8tMLX60v5vOyh7MJrSL7JDpEB47GAHDGcAPcu6hw"

beforeEach(cleanup)
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe('Task 4 - Profile', () => {

  test('checks if the elements are visible according prototype', async () => {
    const { getByTestId, getByText } = renderWithRouter(<Provider><Profile /></Provider>);
    jest.mock('jwt-decode', () => () => ({ name: "kramer", email: "kramerscs@gmail.com", role: "client" }))

    const loading = getByText("Loading...")
    expect(loading).toHaveValue("Loading...")

    const nameInput = getByTestId("profile-name-input")
    const emailInput = getByTestId("profile-email-input")

    act(() => {
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    })
  });

});