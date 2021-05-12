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
history.push('/profile');

const titleId = 'top-title';
const nameId = 'profile-name-input';
const emailId = 'profile-email-input';

describe('1 - [PÁGINA DE PERFIL DO CLIENTE] Crie uma página de perfil para clientes com os seguintes campos e características:', () => {

  test('A rota para esta página deve ser \'/profile\'', () => {
    render(<App />);
 
    expect(history.location.pathname).toBe('/profile');
  });

  test('A página contém um título e campos para nome e email', () => {
    render(<App />);

    const title = screen.getByTestId(titleId);
    const name = screen.getByTestId(nameId);
    const email = screen.getByTestId(emailId);

    expect(title).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('Contém um título com o texto \'Perfil\'', () => {
    render(<App />);

    const title = screen.getByText(/Perfil/i);
    expect(title).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Salvar\'', () => {
    render(<App />);

    const button = screen.getByText(/Salvar/i);
    expect(button).toBeInTheDocument();
  });
  

  test('O botão salvar fica desabilitado caso não altere o nome.', () => {
    render(<App />);
    
    const button = screen.getByText(/Salvar/i);
    expect(button).toBeDisabled();
  });

  test('O botão salvar fica habilitado caso o nome seja alterado', () => {
    render(<App />);
    
    const name = screen.getByTestId(nameId);
    const button = screen.getByText(/Salvar/i);

    userEvent.type(name, `${name} Antônio`);
    expect(button).toBeEnabled();
  });

  test('É possível alterar o nome do usuário', () => {
    render(<App />);

    const name = screen.getByTestId(nameId);
    const button = screen.getByText(/Salvar/i);

    userEvent.type(name, 'Antônio Gonçalves');
    fireEvent.click(button);

    const newName = screen.getByTestId(nameId);
    expect(newName).toHaveTextContent('Antônio Gonçalves');
  });
});
