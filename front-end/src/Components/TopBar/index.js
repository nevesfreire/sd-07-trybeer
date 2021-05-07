import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar';
import './index.css';
import burguerBtn from '../../images/menu-svgrepo-com.svg';
import verifyUserLocalStorage from '../../util/changeLocalStorage';

export default function () {
  const history = useHistory();
  const path = history.location.pathname;
  const [userRole, setRole] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('TryBeer');

  const getTitle = () => {
    switch (path) {
    case '/profile':
      setTitle('Meu perfil');
      break;
    case '/products':
      setTitle('TryBeer');
      break;
    case '/checkout':
      setTitle('Finalizar Pedido');
      break;
    case '/orders':
      setTitle('Meus pedidos');
      break;
    default:
      setTitle('Detalhes de Pedido');
    }
  };

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) {
      localStorage.clear();
      return history.push('/login');
    }
    const { data: { role } } = JSON.parse(localStorage.getItem('user'));
    setRole(role);
    getTitle();
  });

  return (
    <div>
      <nav>
        <button
          className="hamburger-btn"
          data-testid="top-hamburguer"
          type="button"
          onClick={ () => setIsClicked(!isClicked) }
        >
          <img className="hamburger-icon" src={ burguerBtn } alt="" />
        </button>
        <h1 data-testid="top-title">{ title }</h1>
      </nav>
      <div hidden={ !isClicked }>
        <SideBar role={ userRole } />
      </div>
    </div>
  );
}
