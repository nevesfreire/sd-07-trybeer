import React, { useState, useContext, useEffect } from 'react';
import BeerAppContext from '../../context/BeerAppContext';

function ProductCard({ product }) {
  const [productsQtd, setProductsQtd] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const { totalProducts, setTotalProducts } = useContext(BeerAppContext);

  const addProductQtd = () => {
    const qtd = productsQtd;
    setProductsQtd(qtd + 1);
    setButtonDisable(false);
    handleTotalPrice(product.price);
  }

  const subtractProductQtd = () => {
    const qtd = productsQtd;
    if (qtd > 0) {
      setProductsQtd(qtd - 1);
      handleTotalPrice(product.price);
    } else {
      setButtonDisable(true);
    }
  }

  const convertPrice = (price) => {
    const priceArray = price.split('.');
    const newPrice = priceArray.join(',');
    return `R$ ${newPrice}`;
  }

  const handleTotalPrice = (price) => {
    const currentValue = parseFloat(price, 10);
    console.log(productsQtd, ' qtd');
    console.log(currentValue, ' current');
    setTotalProducts(currentValue * productsQtd);
  }

  useEffect(() => {
    handleTotalPrice(product.price);
  }, [addProductQtd, subtractProductQtd]);

  return (
    <div key={product.id} >
      <p data-testid={`${product.id}-product-price`} >{convertPrice(product.price)}</p>
      <img src={product.url_image} alt={product.name} width="100" data-testid={`${product.id}-product-img`} />
      <h2 data-testid={`${product.id}-product-name`} >{product.name}</h2>
      <button
        type="button"
        disabled={buttonDisable}
        onClick={ () => {
          subtractProductQtd();
          // handleTotalPrice(product.price, 'subtract');
        } }
        data-testid={`${product.id}-product-minus`}
      >-</button>
      <p data-testid={`${product.id}-product-qtd`}>{productsQtd}</p>
      <button
        type="button"
        onClick={ () => {
          addProductQtd();
          // handleTotalPrice(product.price, 'add');
        } }
        data-testid={`${product.id}-product-plus`}
      >+</button>
    </div>
  )
}

export default ProductCard;
