import React, { useContext, useEffect } from 'react';
import { ViewCart, CardButtons } from '../components';
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
        productState.products.map(({ id, price, name, url_image }) => (
          <div className="cardContainer" key={ id }>
            <h4 data-testid={`${id}-product-name`} >{ name }</h4>
            <h5 data-testid={`${id}-product-price`}>{ price }</h5>
            <img src={ url_image } alt="foto da bebida" data-testid={`${id}-product-img`} />
            <CardButtons id={ id } />
          </div>
        ))
      }
      <ViewCart />
    </div>
  );
}
