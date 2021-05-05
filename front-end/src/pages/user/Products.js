import React, { useContext, useEffect, useState } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Products() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);
  console.log("product", products);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {isLoading
        ? <span>Carregando...</span>
        : (
          <div>
            {products.map((product, index) => (
              <div key={ product.id }>
                <img
                  src={ product.url_image.replace(/\s/g, '') }
                  alt={ product.name }
                  data-testid={`${index}-product-img`}
                />
                <span data-testid={`${index}-product-name`}>{ product.name }</span>
                <span data-testid={`${index}-product-price`}>
                  { Number(product.price)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                </span>
                <span data-testid={`${index}-product-qtd`}>{ quantity }</span>
                <button
                  type="button"
                  data-testid={`${index}-product-minus`}
                  disabled={ quantity === 0 }
                  onClick={ () => setQuantity(quantity - 1) }
                >
                  -
                </button>
                <button
                  type="button"
                  data-testid={`${index}-product-plus`}
                  onClick={ () => setQuantity(quantity + 1) }
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default Products;
