import React from 'react';
import { screen, fireEvent, waitForElement, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './config/renderWithRouter';

afterEach(cleanup);

test('O menu burguer é aberto ao ser clicado e fechado ao ser clicado novamente', async (done) => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'user@test.com');
  userEvent.type(passwordInput, 'test123');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const trybeer = await waitForElement(() => getByText('TryBeer'));
  expect(trybeer).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('top-hamburguer'));
  const produtos = await waitForElement(() => getByText('Produtos'));
  expect(produtos).toBeInTheDocument();
  done();
});

test('A barra lateral do administrador é visivel ao acessar a página de Produtos', async (done) => {
  const { getByTestId, getByText, getByClassname } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'tryber@trybe.com.br');
  userEvent.type(passwordInput, '123456');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const pedidos = await waitForElement(() => getByText('Pedidos'));
  expect(pedidos).toBeInTheDocument();
  done();
});

test('O botão Pedidos acessa a rota que mostra as vendas realizadas', async (done) => {
  const { getByTestId, getByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'tryber@trybe.com.br');
  userEvent.type(passwordInput, '123456');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const pedidos = await waitForElement(() => getByText('Pedidos'));
  fireEvent.click(screen.getByTestId('side-menu-item-orders'));
  const pedidosPendentes = await waitForElement(() => getByText('Pedidos Pendentes'));
  const { pathname } = history.location;
  expect(pathname).toBe('/admin/orders');

  done();
});

test('O botão Perfil acessa a rota que mostra o perfil do administrador', async (done) => {
  const { getByTestId, getByText, getAllByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'tryber@trybe.com.br');
  userEvent.type(passwordInput, '123456');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const pedidos = await waitForElement(() => getByText('Pedidos'));
  fireEvent.click(screen.getByTestId('side-menu-item-profile'));
  const perfil = await waitForElement(() => getAllByText('Perfil'));
  const { pathname } = history.location;
  expect(pathname).toBe('/admin/profile');
  done();
});

test('O botão Sair acessa a rota de login e limpa o localStorage', async (done) => {
  const { getByTestId, getByText, getAllByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'tryber@trybe.com.br');
  userEvent.type(passwordInput, '123456');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const pedidos = await waitForElement(() => getByText('Pedidos'));
  fireEvent.click(screen.getByTestId('side-menu-item-logout'));
  const login = await waitForElement(() => getAllByText('Login'));
  const { pathname } = history.location;
  expect(pathname).toBe('/login');
  expect(localStorage.clear).toHaveBeenCalled();
  done();
});

test('O botão Produtos acessa a rota que mostra todos os produtos', async (done) => {
  const { getByTestId, getByText, getAllByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'user@test.com');
  userEvent.type(passwordInput, 'test123');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const trybeer = await waitForElement(() => getByText('TryBeer'));
  fireEvent.click(getByTestId('top-hamburguer'));
  const produtos = await waitForElement(() => getByText('Produtos'));
  fireEvent.click(getByTestId('side-menu-item-products'));
  const pedidos = await waitForElement(() => getByText('Pedidos'));
  const { pathname } = history.location;
  expect(pathname).toBe('/products');
  done();
});

test('O botão Meus Pedidos acessa a rota que mostra todos os pedidos do usuário', async (done) => {
  const { getByTestId, getByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'user@test.com');
  userEvent.type(passwordInput, 'test123');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const trybeer = await waitForElement(() => getByText('TryBeer'));
  fireEvent.click(getByTestId('top-hamburguer'));
  const botaoPedidos = await waitForElement(() => getByText('Pedidos'));
  fireEvent.click(getByTestId('side-menu-item-my-orders'));

  const { pathname } = history.location;
  expect(pathname).toBe('/orders');
  done();
});

test('O botão Meu Perfil acessa a rota que mostra o perfil do usuário', async (done) => {
  const { getByTestId, getByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'user@test.com');
  userEvent.type(passwordInput, 'test123');
  fireEvent.click(getByText(/Entrar/), { button: 0 });

  const trybeer = await waitForElement(() => getByText('TryBeer'));

  fireEvent.click(getByTestId('top-hamburguer'));
  fireEvent.click(getByTestId('side-menu-item-my-profile'));

  const { pathname } = history.location;
  expect(pathname).toBe('/profile');
  done();
});

test('O botão Sair acessa a rota de login e limpa o localStorage', async (done) => {
  const { getByTestId, getByText, history } = renderWithRouter(<App />);
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  userEvent.type(emailInput, 'user@test.com');
  userEvent.type(passwordInput, 'test123');
  fireEvent.click(screen.getByText(/Entrar/), { button: 0 });

  const trybeer = await waitForElement(() => getByText('TryBeer'));

  fireEvent.click(getByTestId('side-menu-item-logout'));

  const { pathname } = history.location;
  expect(pathname).toBe('/login');
  expect(localStorage.clear).toHaveBeenCalled();
  done();
});
