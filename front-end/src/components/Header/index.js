import React from 'react';
import PropTypes from 'prop-types';
import MenuBurger from '../Menu/index';
import {
  Container,
  Title,
} from './styles';

export default function Header({ title }) {
  return (
    <Container>
      <MenuBurger data-testid="top-hamburguer" />
      <Title data-testid="top-title">
        { title }
      </Title>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
