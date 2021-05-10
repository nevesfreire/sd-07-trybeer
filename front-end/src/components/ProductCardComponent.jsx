import React, { useEffect, useState } from 'react';
// import useFetch from '../hooks/useFetch';
// import MyContext from '../context/TrybeerContext';

function ProductsCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
	  fetch('http://localhost:3001/products')
		  .then((response) => response.json())
		  .then((data) => setProducts(data));
	  setLoading(false);
  }, []);

  return loading ? (
    <span>tenha fé...</span>
  ) : (
    <div>
      {products.map((product, index) => (
        <div key={ product.id }>
          <img
            src={ product.url_image.replace(/\s/g, '') }
            alt={ product.name }
            data-testid={ `${index}-product-img` }
          />
          <span data-testid={ `${index}-product-name` }>{product.name}</span>
          <span data-testid={ `${index}-product-price` }>
            {Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <button
            type="button"
            data-testid={ `${index}-product-minus` }
            // onClick={ () => removeFromCart(product.name, product.price) }
          >
            -
          </button>
          <span data-testid={ `${index}-product-qtd` }>
            {/* { getQuantity(product.name) } */}
          </span>
          <button
            type="button"
            data-testid={ `${index}-product-plus` }
            // onClick={ () => addInCart(product.id, product.name, product.price) }
          >
            +
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        // onClick={ () => history.push('/checkout') }
        // disabled={ !total }
      >
        Ver Carrinho &nbsp;
        <span data-testid="checkout-bottom-btn-value">
          {/* { `R$ ${Number(total).toFixed(2).replace('.', ',')}`} */}
        </span>
      </button>
    </div>
  );
}

export default ProductsCards;
