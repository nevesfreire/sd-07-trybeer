import React from 'react';

export default function CustomProductCard({ index, beer }) {
  return (
    <div style={{ width: '8rem' }}>
      {!beer ? (
        'loading'
      ) : (
        <div>
          <p data-testid={`${index}-product-price`}>Valor</p>
          <img
            data-testid={`${index}-product-img`}
            src={beer.url_image}
            alt="imagem de uma bebida"
          />
          <p data-testid={`${index}-product-name`}>Produto</p>
          <div>
          <button data-testid={`${index}-product-plus`}>+</button>
          <p data-testid={`${index}-product-qtd`}>Quantidade</p>
          <button data-testid={`${index}-product-minus`}>-</button>
          </div>
          <div>
            <p data-testid={`${index}-beer-card`}>{`receita ${index + 1}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
