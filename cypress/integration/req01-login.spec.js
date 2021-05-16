import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from '../pages/Products';
import Login from '../pages/Login';
import renderWithRouter from './config/renderWithRouter';

test('O menu burguer é aberto ao ser clicado e fechado ao ser clicado novamente', () => {
  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

  expect(screen.getByText('Trybeer')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('top-hamburguer'));
  expect(screen.getByText('Meu perfil')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('top-hamburguer'));
  expect(screen.getByText('Meu perfil')).not.toBeInTheDocument();
});

test('A barra lateral do administrador é visivel ao acessar a página de Produtos', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "tryber@trybe.com.br");
  userEvent.type(passwordInput, "123456");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/orders');
  }, 3000);

  expect(screen.getByText('Perfil')).toBeInTheDocument();
});

test('O botão Pedidos acessa a rota que mostra as vendas realizadas', () => {

  renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "tryber@trybe.com.br");
  userEvent.type(passwordInput, "123456");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/orders');
  }, 3000);

  fireEvent.click(screen.getByTestId('side-menu-item-orders'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/admin/orders');
  }, 3000);
});

test('O botão Perfil acessa a rota que mostra o perfil do administrador', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "tryber@trybe.com.br");
  userEvent.type(passwordInput, "123456");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/orders');
  }, 3000);

  fireEvent.click(screen.getByTestId('side-menu-item-profile'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/admin/profile');
  }, 3000);
});

test('O botão Sair acessa a rota de login e limpa o localStorage', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "tryber@trybe.com.br");
  userEvent.type(passwordInput, "123456");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/orders');
  }, 3000);

  fireEvent.click(screen.getByTestId('side-menu-item-logout'));
  
  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/login');
    expect(localStorage.clear).toHaveBeenCalled();
  }, 3000);

});

test('O botão Produtos acessa a rota que mostra todos os produtos', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  fireEvent.click(screen.getByTestId('side-menu-item-products'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

});


const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  fireEvent.click(screen.getByTestId('side-menu-item-my-orders'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/orders');
  }, 3000);
});

test('O botão Meu Perfil acessa a rota que mostra o perfil do usuário', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

  fireEvent.click(screen.getByTestId('top-hamburguer'));
  fireEvent.click(screen.getByTestId('side-menu-item-my-profile'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  }, 3000);
});

test('O botão Sair acessa a rota de login e limpa o localStorage', () => {

  const { getByTestId } = renderWithRouter(<Login />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/products');
  }, 3000);

  fireEvent.click(screen.getByTestId('side-menu-item-logout'));

  setTimeout(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/login');
    expect(localStorage.clear).toHaveBeenCalled();
  }, 3000);
});