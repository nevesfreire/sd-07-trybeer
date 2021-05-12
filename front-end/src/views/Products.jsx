import React, { useContext, useEffect } from 'react';
import { ViewCart, CardButtons, Card } from '../components';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchProducts } from '../services';

export default function Products() {
  const { productsDispatch, productState } = useContext(GlobalContext);

  useEffect(() => {
    fetchProducts().then(({ products }) => {
      productsDispatch({ type: actionType.REQUEST_PRODUCTS, payload: products });
    });
  }, [productsDispatch]);

  return (
    <div>
      <TopBar />
      {
        productState.products.map((product) => (
          <div className="cardContainer" key={ product.id }>
            <Card product={ product } />
            <CardButtons id={ product.id } />
          </div>
        ))
      }
      <ViewCart />
    </div>
  );
}
