import React, { useState } from 'react';

function ProductCard({ product }) {
  const [productsQtd, setProductsQtd] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);

  const addProductQtd = () => {
    const qtd = productsQtd;
    setProductsQtd(qtd + 1);
    setButtonDisable(false);
  }

  const subtractProductQtd = () => {
    const qtd = productsQtd;
    if (qtd > 0) {
      setProductsQtd(qtd - 1);
    } else {
      setButtonDisable(true);
    }
  }

  const convertPrice = (price) => {
    const priceArray = price.split('.');
    const newPrice = priceArray.join(',');
    return `R$ ${newPrice}`;
  }

  return (
    <div key={product.id} >
      <p key={product.id} data-testid={`${product.id}-product-price`} >{convertPrice(product.price)}</p>
      <img key={product.id} src={product.url_image} alt={product.name} width="100" data-testid={`${product.id}-product-img`} />
      <h2 key={product.id} data-testid={`${product.id}-product-name`} >{product.name}</h2>
      <button
        type="button"
        disabled={buttonDisable}
        onClick={ () => subtractProductQtd() }
        data-testid={`${product.id}-product-minus`}
      >-</button>
      <p data-testid={`${product.id}-product-qtd`}>{productsQtd}</p>
      <button
        type="button"
        onClick={ () => addProductQtd() }
        data-testid={`${product.id}-product-plus`}
      >+</button>
    </div>
  )
}

export default ProductCard;
