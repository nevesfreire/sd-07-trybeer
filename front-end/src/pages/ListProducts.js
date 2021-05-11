import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, ProductCard, Loading } from '../components';

import TrybeerContext from '../store/context';
import { ProductCard, Loading } from '../components';
import { getProducts } from '../api';
import acessLocalStorage from '../services';

// teste

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { cart } = useContext(TrybeerContext);

  const requestProducts = useCallback(async () => {
    const user = await acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    const resultApi = await getProducts(user.token);
    setproducts(resultApi.data);
    if (resultApi) setLoading(false);
  }, [setproducts]);

  const sumItens = cart ? Object.keys(cart)
    .reduce(
      (acc, value) => (
        acc + (parseFloat(cart[value].item.price)) * (cart[value].quantity)
      ), 0,
    ) : 0;

  useEffect(() => {
    requestProducts();
  }, [requestProducts]);

  return (
    <div>
      <div>
        <Header title="TryBeer" />
      </div>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      {
        loading
          ? <Loading />
          : (
            <>
              {
                products
                  .map((product, index) => {
                    const alterSnakeCase = product.url_image;
                    product.urlImage = alterSnakeCase;
                    return <ProductCard key={ index } item={ product } index={ index } />;
                  })
              }
              <button
                type="button"
                data-testid="checkout-bottom-btn"
                onClick={ () => history.push('/checkout') }
              >

                Ver Carrinho
                <br />
                <span
                  data-testid="checkout-bottom-btn-value"
                >
                  {`R$ ${(sumItens).toFixed(2).split('.').join(',')}`}
                </span>
              </button>
            </>
          )
      }
    </div>
  );
}

export default Products;
