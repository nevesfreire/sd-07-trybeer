import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'bulma/css/bulma.min.css';

import logo from '../img/logo.svg';

const burguerViewer = () => {
  const showMenu = document.querySelector('#navMenu');
  showMenu.classList.toggle('is-hidden');
  showMenu.classList.toggle('is-active');
};

const logout = async () => {
  await localStorage.removeItem('user');
};

function HeaderAdmin({ title }) {
  return (
    <section
      className="hero is-warning column is-one-quarter is-flex-direction-column"
      style={ { maxHeight: '80rem', minHeight: '80rem' } }
    >
      <div className="hero-body mt-0 p-0">
         <img src={ logo } alt="Group-4" width="150" height="50" />
         <br />
         <div data-testid="top-title column is-one-quarter">{ title }</div>
         <div className="navbar-menu">
          <div className="navbar-start is-flex-direction-column">
            <div className="navbar-item is-active">
            <Link
              to="/admin/orders"
              className="navbar-item is-fullwidth is-expanded"
              data-testid="side-menu-item-orders"
              onClick={ () => burguerViewer() }
            >
              Meus Pedidos
            </Link>
            </div>
            <div className="navbar-item">
            <Link
              to="/admin/profile"
              className="navbar-item"
              data-testid="side-menu-item-profile"
              onClick={ () => burguerViewer() }
            >
              Meu Perfil
            </Link>
            </div>
            <div className="navbar-item">
            <Link
              to="/login"
              className="navbar-item"
              data-testid="side-menu-item-logout"
              onClick={ () => logout() }
            >
              Sair
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <nav
    //   className="navbar is-warning is-fixed-top"
    //   role="navigation"
    //   aria-label="main navigation"
    // >
    //   <button type="button" className="button-burguer" onClick={ () => burguerViewer() }>
    //     <div
    //       data-testid="top-hamburguer"
    //       role="button"
    //       className="navbar-burger is-flex-tablet"
    //       aria-label="menu"
    //       aria-expanded="false"
    //     >
    //       <span aria-hidden="true" />
    //       <span aria-hidden="true" />
    //       <span aria-hidden="true" />
    //     </div>
    //   </button>
    //   <div
    //     className="admin-side-bar-container
    //     navbar-item has-dropdown is-hoverable is-active"
    //     id="navMenu"
    //   >
    //     <div className="navbar-dropdown">
    //       <Link
    //         to="/admin/orders"
    //         className="navbar-item is-expanded"
    //         data-testid="side-menu-item-orders"
    //         onClick={ () => burguerViewer() }
    //       >
    //         Meus Pedidos
    //       </Link>
    //       <Link
    //         to="/admin/profile"
    //         className="navbar-item"
    //         data-testid="side-menu-item-profile"
    //         onClick={ () => burguerViewer() }
    //       >
    //         Meu Perfil
    //       </Link>
    //       <Link
    //         to="/login"
    //         className="navbar-item"
    //         data-testid="side-menu-item-logout"
    //         onClick={ () => logout() }
    //       >
    //         Sair
    //       </Link>
    //     </div>
    //     <div className="navbar-item">
    //       <div className="navbar-item">
    //         {/* 1 */}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="navbar-end">
    //     <span data-testid="top-title">{ title }</span>
    //     <img src={ logo } alt="Group-4" width="150" height="50" />
    //   </div>
    // </nav>
  );
}

HeaderAdmin.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderAdmin;
