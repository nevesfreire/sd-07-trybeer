import React from 'react';
import MenuBurger from '../Menu';
import {
  Container,
  Title
} from './styles';

export default function Header ({ title }) {
  return (
    <Container>
      <MenuBurger data-testid="top-hamburguer"/>
      <Title data-testid="top-title">
        { title }
      </Title>
    </Container>
  );
};
