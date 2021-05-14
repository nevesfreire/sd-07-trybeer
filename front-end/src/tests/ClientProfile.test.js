import React from 'react';
import { screen, fireEvent, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import ClientProfile from '../pages/ClientProfile';
import renderWithRouter from './config/renderWithRouter';

test('Renderiza tela de perfil do cliente na rota `/profile`', async (done) => {
  const { getByTestId } = renderWithRouter(<App />);

  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');

  userEvent.type(emailInput, "user@test.com");
  userEvent.type(passwordInput, "test123");
  fireEvent.click(screen.getByTestId('signin-btn'));

  const title = await waitForElement(() => screen.getByText('TryBeer'));
  expect(title).toBeInTheDocument();

  // expect(screen.getByText('Meu perfil')).toBeInTheDocument();
  done();
});

// test('Botão de `Salvar` deve estar desabilitado', () => {
//   renderWithRouter(<ClientProfile />);

//   expect(screen.getByText('Salvar')).toBeInTheDocument();
//   expect(screen.getByTestId('profile-save-btn')).toBeDisabled();
// });

// test('Botão de `Salvar` deve ficar habilitado quando o campo'
//   +'`Nome` estiver preenchidos corretamente',
//   () => {
//   const { getByTestId } = renderWithRouter(<ClientProfile />);

//   const nameInput = getByTestId('profile-name-input');
//   const emailInput = getByTestId('tprofile-email-input');

//   expect(screen.getByText('Meu perfil')).toBeInTheDocument();
//   expect(emailInput).toHaveAttribute('readonly');

//   userEvent.type(nameInput, "User Test Name");
//   expect(screen.getByTestId('signin-btn')).not.toBeDisabled();
// });

// test('Quando clicar botão `Ainda não tenho conta`, redirecionar para rota `/register`', () => {
//   const { history } = renderWithRouter(<Login />);
//   fireEvent.click(screen.getByTestId('no-account-btn'));

//   const { pathname } = history.location;
//   expect(pathname).toBe('/register');
// });
