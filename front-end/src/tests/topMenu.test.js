import React from 'react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import '@testing-library/dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const history = createMemoryHistory();

const emailId = 'email-input';
const passwordId = 'password-input';

describe('1 - [PÁGINA DE REGISTER] Testa se a rota "/register" existe:', () => {
  
  test('A rota para esta página deve ser \'/login\'', () => {
    history.push('register');
    render(<App />);
 
    expect(history.location.pathname).toBe('/register');
  });

});
