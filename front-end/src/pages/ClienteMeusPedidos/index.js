import React from 'react';
import Card from './Card';

const handleCards = () => {

};

function MeusPedidos() {
  return (
    <div>
      <header>
        <h1 data-testid="top-title">Meus pedidos</h1>
      </header>
      <section>
        {handleCards()}
      </section>
    </div>
  );
}

export default MeusPedidos;
