import React, { useState, useEffect } from 'react';
const axios = require('axios');

// import api from '../services/api';

const ComponentBeers = () => {
  // const [Beers, setBeers] = useState(['carregando ...']);
  const [Beers, setBeers] = useState([
    { imagem: 'pathnameimage', nome: 'cerveja', preco: 20 },
    { imagem: 'pathnameimage2', nome: 'cerveja2', preco: 30 },
  ]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Você clicou ${count} vezes`;
    const getBeers = async () => {
      const { results } = await axios.get('http://localhost:3000/products');
      setBeers(results);
      console.log(`UseEffect results: ${results}`);
    };
    getBeers();
  }, [count]);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
      {console.log(`Render beer: ${Beers}`)}
      {/* {Beers.map((Beer) => (
        <div
          key={ Beer.nome }
          // data-testid={  }
          // className=""
        >
          <img
            // data-testid={ }
            src={ Beer.imagem }
            alt={ Beer.nome }
          />
          <h1>{Beer.nome}</h1>
          <p>{Beer.preco}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ComponentBeers;
