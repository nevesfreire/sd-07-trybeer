import React, { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Products() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  // const { } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {isLoading
        ? <span>Carregando...</span>
        : (
          <div>
            {products.map((product) => (
              <Card
                key={ product.id }
                name={ product.name }
                urlImage={ product.url_image.replace(/\s/g, '') }
                price={ Number(product.price)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                quantity="quantity"
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default Products;
