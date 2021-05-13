import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { clearStorage, getStorage } from '../../services/localStorage';
// import HeaderButtons from '../HeaderButtons/HeaderButtons';
import format from '../../util/format';

import styles from './styles.module.scss';

function Header({ children }) {
  const history = useHistory();
  // const [sideMenu, setSideMenu] = useState(true);
  const [role, setRole] = useState('client');
  const { pathname } = useLocation();
  const totalPrice = useSelector((state) => state.client.totalPrice);

  useEffect(() => {
    const user = getStorage('user');
    if (user && user.role === 'administrator') setRole('administrator');
  }, []);

  function handleClick({ target }) {
    console.log(target.name);
    switch (target.name) {
    case 'products':
      return history.push('/products');
    case 'orders':
      return history.push('/checkout');
    case 'profile':
      return history.push('/profile');
    default:
      clearStorage('user');
      return history.push('/');
    }
  }

  // function handleClickAdm({ target }) {
  //   switch (target.name) {
  //   case 'orders':
  //     return history.push('/admin/orders');
  //   case 'profile':
  //     return history.push('/admin/profile');
  //   default:
  //     return history.push('/');
  //   }
  // }

  return (
    <header>
      <div className={ styles.navigation }>
        <h2>Logo</h2>
        <ul>
          <li>
            <button
              type="button"
              onClick={ handleClick }
              name="products"
              className={ pathname === '/products' ? styles.selected : '' }
            >
              Produtos
            </button>
          </li>
          <span>|</span>
          <li>
            <button
              type="button"
              onClick={ handleClick }
              name="profile"
              className={ pathname === '/profile' ? styles.selected : '' }
            >
              Meu Perfil
            </button>
          </li>
          <span>|</span>
          <li>
            <button type="button" onClick={ handleClick } name="exit">
              LogOut
            </button>
          </li>
        </ul>
      </div>
      <Link to="/checkout">
        Meu carrinho
        <span>{format(totalPrice)}</span>
      </Link>
    </header>
  );
}

export default Header;

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
