import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from '../styled/Menu.styled';
import { Link } from 'react-router-dom';

const Menu = ({ open, ...props }) => {

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Link to="/"> Produtos </Link>
      <Link to="/"> Meus Pedidos </Link>
      <Link to="/"> Meu Perfil </Link>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;