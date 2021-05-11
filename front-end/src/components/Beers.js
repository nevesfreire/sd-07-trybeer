import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ComponentBeers = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [Beers, setBeers] = useState(['carregando ...']);
  // const [Beers, setBeers] = useState([
  //   { imagem: 'http://localhost:3001/images/Skol_Lata_350ml.jpg', nome: 'cerveja', preco: 20 },
  //   { imagem: '../../../images/Heineken_600ml.jpg', nome: 'cerveja2', preco: 30 },
  // ]);

  useEffect(() => {
    setIsLoading(true);
    const getBeers = async () => {
      const { data } = await api.get('/products');
      setBeers(data);
      setIsLoading(false);
      // console.log(`UseEffect results: ${data}`);
    };
    getBeers();
  }, []);

  return (
    <div className="product-list-container">
      {/* {console.log(`Render beer: ${Beers}`)} */}
      <button data-testid="checkout-bottom-btn" type="button">
        Ver carrinho
      </button>
      <p data-testid="checkout-bottom-btn-value">Valor total do carrinho</p>
      {isLoading ? (
        <span>Carregando ...</span>
      ) : (
        Beers.map((Beer, index) => (
          <div
            key={ Beer.nome }
            // data-testid={  }
            className="product-item-container"
          >
            <img
              data-testid={ `${index}-product-img` }
              src={ Beer.imagem }
              alt={ Beer.nome }
            />
            <h3 data-testid={ `${index}-product-name` }>{Beer.nome}</h3>
            <p data-testid={ `${index}-product-price` }>{Beer.preco}</p>
            <p data-testid={ `${index}-product-qtd` }>
              Quantidade
              {count}
            </p>
            <button
              type="button"
              data-testid={ `${index}-product-plus` }
              onClick={ () => setCount(count + 1) }
            >
              +
            </button>
            <button
              type="button"
              data-testid={ `${index}-product-minus` }
              onClick={ () => setCount(count - 1) }
            >
              -
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ComponentBeers;
