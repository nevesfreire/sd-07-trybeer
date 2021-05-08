import React from 'react';
import PropTypes from 'prop-types';

function HeaderButtons(props) {
  const { sideMenu, role, handleClick, handleClickAdm } = props;
  return (
    <div>
      <ul
        className={
          sideMenu && role === 'client'
            ? 'menuInfoHide'
            : 'menuInfo side-menu-container'
        }
      >
        { role === 'client' && (
          <li>
            <button
              type="button"
              name="products"
              data-testid="side-menu-item-products"
              onClick={ handleClick }
            >
              Produtos
            </button>
          </li>)}
        <li>
          <button
            type="button"
            name="orders"
            data-testid={
              role === 'client' ? 'side-menu-item-my-orders' : 'side-menu-item-orders'
            }
            onClick={ role === 'client' ? handleClick : handleClickAdm }
          >
            Meus Pedidos
          </button>
        </li>
        <li>
          <button
            type="button"
            name="profile"
            data-testid={
              role === 'client' ? 'side-menu-item-my-profile' : 'side-menu-item-profile'
            }
            onClick={ role === 'client' ? handleClick : handleClickAdm }
          >
            Meu Perfil
          </button>
        </li>
        <li>
          <button
            type="button"
            name="login"
            data-testid="side-menu-item-logout"
            onClick={ handleClick }
          >
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}

HeaderButtons.propTypes = {
  sideMenu: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClickAdm: PropTypes.func.isRequired,
};

export default HeaderButtons;
