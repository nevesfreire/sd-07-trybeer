import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { ViewCart, CardButtons, Card } from '../components';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchProducts } from '../services';

export default function Products() {
  const { productsDispatch, productState } = useContext(GlobalContext);

  useEffect(() => {
    fetchProducts().then((response) => {
      console.log(response);
      productsDispatch({ type: actionType.REQUEST_PRODUCTS, payload: response.products });
    }).catch(() => {
      productsDispatch({ type: actionType.USER_INVALID });
    });
  }, [productsDispatch]);

  if (!productState.isUserValid) return <Redirect to="/" />;

  return (
    <div>
      <TopBar />
      {
        productState.products.map((product, index) => (
          <div className="cardContainer" key={ product.id - 1 }>
            <Card product={ product } index={ index } />
            <CardButtons id={ product.id } index={ index } />
          </div>
        ))
      }
      <ViewCart />
    </div>
  );
}
