import React from 'react';
import PropTypes from 'prop-types';
import { StyledBurger } from './styles';

const Burger = ({ open, setOpen }) => (
  <div data-testid="top-hamburguer">
    <StyledBurger open={ open } onClick={ () => setOpen(!open) }>
      <div />
      <div />
      <div />
    </StyledBurger>
  </div>
);

export default Burger;

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
