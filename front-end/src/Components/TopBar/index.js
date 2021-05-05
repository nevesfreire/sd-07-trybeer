import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar';
import './index.css';

export default function () {
  const history = useHistory();
  const path = history.location.pathname;
  const { data: { role } } = JSON.parse(localStorage.getItem('user'));
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('TryBeer');

  const getTitle = () => {
    switch (path) {
    case '/profile':
      setTitle('Meu Perfil');
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
    getTitle();
  }, []);

  return (
    <div>
      <nav>
        <button
          className="hamburger-btn"
          type="button"
          onClick={ () => setIsClicked(!isClicked) }
        >
          <img className="hamburger-icon" src="../../images/burguer.png" alt="" />
        </button>
        <h1>{ title }</h1>
      </nav>
      <div hidden={ !isClicked }>
        <SideBar role={ role } />
      </div>
    </div>
  );
}
