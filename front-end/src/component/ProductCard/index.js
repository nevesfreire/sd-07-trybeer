import React, { useContext } from 'react';
import BeerAppContext from '../../context/BeerAppContext';

function ProductCard({ product }) {
  const { addProductQtd, subtractProductQtd, shopCart } = useContext(BeerAppContext);

  const convertPrice = price => {
    const priceArray = price.split('.');
    const newPrice = priceArray.join(',');
    return `R$ ${newPrice}`;
  };

  const getQtd = () => {
    const item = shopCart.find((cart) => cart.id === product.id);
    if (item) {
      return item.qtd;
    }
    return 0;
  }

  return (
    <div key={product.id}>
      <p data-testid={`${product.id - 1}-product-price`}>
        {convertPrice(product.price)}
      </p>
      <img
        src={product.url_image}
        alt={product.name}
        width='100'
        data-testid={`${product.id - 1}-product-img`}
      />
      <h2 data-testid={`${product.id - 1}-product-name`}>{product.name}</h2>
      <button
        type='button'
        onClick={() => subtractProductQtd(product.id, product.price) }
        data-testid={`${product.id - 1}-product-minus`}>
        -
      </button>
      <p data-testid={`${product.id - 1}-product-qtd`}>{getQtd()}</p>
      <button
        type='button'
        onClick={() => addProductQtd(product.id, product.price) }
        data-testid={`${product.id - 1}-product-plus`}>
        +
      </button>
    </div>
  );
}

export default ProductCard;
