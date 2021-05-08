import React, { useState, useContext, useEffect } from 'react';
import CentralContext from '../context/Context';

export default function CustomProductCard({ index, beer }) {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  const [qtdProduct, setQtdProduct] = useState(0);

  useEffect(() => {}, [qtdProduct]);

  const addMore = () => {
    const more = Number(beer.price);
    const result = totalKart + more;
    setTotalKart(result);
    setQtdProduct(qtdProduct + 1);
  };

  const removeLess = () => {
    const zero = 0;
    if (qtdProduct > zero) {
      const less = Number(beer.price);
      const result = (totalKart - less);
      setTotalKart(result);
      setQtdProduct(qtdProduct - 1);
    } else {

    }
  };
  return (
    <div style={ { width: '8rem' } }>
      {!beer ? (
        'loading'
      ) : (
        <div>
          <p
            data-testid={ `${index}-product-price` }
          >
            {`R$ ${beer.price.replace('.', ',')}`}
          </p>
          <img
            data-testid={ `${index}-product-img` }
            src={ beer.url_image }
            alt="imagem de uma bebida"
          />
          <p data-testid={ `${index}-product-name` }>{beer.name}</p>
          <div>
            <button
              data-testid={ `${index}-product-plus` }
              onClick={ () => addMore() }
            >
              +
            </button>
            <p
              data-testid={ `${index}-product-qtd` }
              onChange={ () => setTotalKart(qtdProduct * beer.price) }
            >
              {qtdProduct}
            </p>
            <button
              data-testid={ `${index}-product-minus` }
              onClick={ () => removeLess() }
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
