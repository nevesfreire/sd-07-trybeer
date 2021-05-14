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
import { login, register } from '../service/trybeerApi';

const history = createMemoryHistory();

const nameId = 'signup-name'
const emailId = 'signup-email';
const passwordId = 'signup-password';
const sellerId = 'signup-seller';

describe('1 - [PÁGINA DE REGISTRO] Crie uma página para registro de usuários com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/register\'', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);
 
    expect(history.location.pathname).toBe('/register');
  });

  test('Crie um local para que o usuário insira seu nome, email e password', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);

    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);
    const seller = screen.getByTestId(sellerId);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(seller).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Cadastrar\'', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);

    const button = screen.getByText(/Cadastrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, password e botão:', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);
   
    const button = screen.getByText(/Cadastrar/i);
    expect(button).toBeDisabled();

    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'email');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'email@com@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'emailcom@');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '23456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos!');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos1');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');
    expect(button).toBeEnabled();
  });

  test('Realiza cadastro com usuário client.', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);
    
    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);
    const button = screen.getByText(/Cadastrar/i);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'emailteste@teste.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('products');

    expect(history.location.pathname).toBe('/products');
  });

  test('Realiza cadastro com usuário admin', () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);

    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);
    const button = screen.getByText(/Cadastrar/i);
    const seller = screen.getByTestId(sellerId);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'adminteste@teste.com');
    userEvent.type(password, 'test123');
    fireEvent.click(seller);
    expect(seller).toBeChecked();
    expect(button).toBeEnabled();
    fireEvent.click(button);

    history.push('admin/orders');

    expect(history.location.pathname).toBe('/admin/orders');
  });

  test('Registro de usuário já existente exibe mensagem de erro.', async () => {
    render(<App />);
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);

    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);
    const button = screen.getByText(/Cadastrar/i);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'user@test.com');
    userEvent.type(password, '123456789');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const result = await register('testuser', 'user@test.com', '123456789', 'client');
    await login('test@test.com', '123456789')

    const message = 'Já existe um usuário com esse e-mail.';
  
    expect(message).toMatch(result.error);
  });

});



describe('2 - [PÁGINA DE REGISTRO INFORMAÇÕES USER LOCALSTORAGE] Salvar as informações de usuário no localstorage e recuperar as informações :', () => {

  test('Testa se o token está ok.', async () => {
    render(<App />);
    beforeEach(() => localStorage.clear());
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);
  
    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passwordId);
    const button = screen.getByText(/Cadastrar/i);

    userEvent.type(name, 'Roberto Carlos');
    userEvent.type(email, 'usuario@test.com');
    userEvent.type(password, 'test123');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    await register('Roberto Carlos', 'usuario@test.com', 'test123', 'client');
    const result = await login('usuario@test.com', 'test123')

    localStorage.setItem('user', JSON.stringify(result));
  
    expect(JSON.parse(localStorage.getItem('user')).token).toBe(result.token);
  });

  test('Testa se o email de usuário está ok.', async () => {
    render(<App />);
    beforeEach(() => localStorage.clear());
    const createAccountButton = screen.getByText(/Ainda não tenho conta/i);
    fireEvent.click(createAccountButton);

    await register('Roberto Carlos', 'usuario@test.com', 'test123', 'client');
    const result = await login('usuario@test.com', 'test123')

    localStorage.setItem('user', JSON.stringify(result));
  
    expect(JSON.parse(localStorage.getItem('user')).email).toBe(result.email);
  });

});