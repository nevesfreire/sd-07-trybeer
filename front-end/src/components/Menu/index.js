import React, { useContext } from 'react';
import { Button, StyledMenu, StyledBurger } from './styles';

const MenuAdmin = ({ open }) => (
  <StyledMenu class="side-menu-container" open={ open }>
    <Button
      name="btn-requests"
      to="/"
      data-testid="btn-requests"
    >
      Pedidos
    </Button>
    <Button
      name="btn-profile"
      to="/"
      data-testid="btn-profile"
    >
      Perfil
    </Button>
    <Button
      name="btn-exit"
      to="/"
      data-testid="side-menu-item-logout"
    >
      Sair
    </Button>
  </StyledMenu>
);

const MenuClient = ({ open }) => (
  <StyledMenu class="side-menu-container" open={ open }>

    <Button
      name="btn-products"
      to="/"
      data-testid="side-menu-item-products"
    >
      Produtos
    </Button>
    <Button
      name="btn-profile"
      to="/"
      data-testid="side-menu-item-my-orders"
    >
      Meus Pedidos
    </Button>
    <Button
      name="btn-myRequests"
      to="/"
      data-testid="side-menu-item-my-profile"
    >
      Meu Perfil
    </Button>
    <Button
      name="btn-exit"
      to="/"
      data-testid="side-menu-item-logout"
    >
      Sair
    </Button>
  </StyledMenu>
);

const Burger = ({ open, setOpen }) => (
  <StyledBurger open={ open } onClick={ () => setOpen(!open) }>
    <div />
    <div />
    <div />
  </StyledBurger>
);

const MenuBurger = () => {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  return (
    <div>
      <div ref={ node }>
        <Burger open={ open } setOpen={ setOpen } />
        <MenuClient open={ open } setOpen={ setOpen } />
      </div>
    </div>
  );
};

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  },
  [ref, handler]);
};

export default MenuBurger;
