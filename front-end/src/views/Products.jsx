import React, { useContext, useEffect } from 'react';
import { ViewCart, CardButtons } from '../components';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchProducts } from '../services';
import { useLocalStorage } from '../hooks';

export default function Products() {
  const { productsDispatch, productState } = useContext(GlobalContext);
  const [localStorageState, setStorage] = useLocalStorage('shoppingCart');

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
            <h4>{ product.name }</h4>
            <h5>{ product.price }</h5>
            <img src={ product.url_image } alt="foto da bebida" />
            <CardButtons
              id={ product.id }
              storage={ localStorageState }
              setStorage={ setStorage }
            />
          </div>
        ))
      }
      <ViewCart storage={ localStorageState } />
    </div>
  );
}
