import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bulma-components';
import { Header, ProductCard, Loading } from '../components';

import TrybeerContext from '../store/context';
import { getProducts } from '../api';
import acessLocalStorage from '../services';
// teste

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [noHaveProduct, setNoHaveProduct] = useState(true);
  const history = useHistory();
  const { cart } = useContext(TrybeerContext);

  const requestProducts = useCallback(async () => {
    const user = await acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    if (!user) return history.push('/login');
    const resultApi = await getProducts(user.token);
    setproducts(resultApi.data);
    if (resultApi) setLoading(false);
  }, [setproducts, history]);

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
      {
        loading
          ? <Loading />
          : (
            <div
              className="is-inline-flex mt-6 is-flex-wrap-wrap is-justify-content-center"
            >
              {
                products
                  .map((product, index) => {
                    const alterSnakeCase = product.url_image;
                    product.urlImage = alterSnakeCase;
                    return <ProductCard key={ index } item={ product } index={ index } />;
                  })
              }
            </div>
          )
      }

      <Button
        className="navbar is-medium is-fullwidth is-warning is-fixed-bottom"
        data-testid="checkout-bottom-btn"
        onClick={ () => history.push('/checkout') }
        disabled={ sumItens === 0 }
      >

        Ver Carrinho
        <br />
        <span
          data-testid="checkout-bottom-btn-value"
        >
          {`R$ ${(sumItens).toFixed(2).split('.').join(',')}`}
        </span>
      </Button>
    </div>
  );
}

export default Products;
