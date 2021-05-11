import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../services/apiService';

export default function ProductsList() {
  const [products, setProducts] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getProducts(currentUser.token)
        .then((apiResponse) => apiResponse);

      setProducts(response.map((item) => ({ ...item, productQtt: 0 })));
      setTotalValue(0);
    };

    fetchProducts();
  }, []);

  const addProdQtt = (id) => {
    const searchedProduct = products.find((e) => e.id === id);
    const index = products.indexOf(searchedProduct);
    const newArr = [...products];
    newArr[index].productQtt += 1;
    const price = parseFloat(searchedProduct.price);
    setProducts(newArr);
    setTotalValue(totalValue + price);
    console.log({ products });
  };

  const decProdQtt = (id) => {
    const searchedProduct = products.find((e) => e.id === id);
    const index = products.indexOf(searchedProduct);
    if (searchedProduct.productQtt === 0) {
      return null;
    }
    const newArr = [...products];
    newArr[index].productQtt -= 1;
    const price = parseFloat(searchedProduct.price);
    setTotalValue(totalValue - price);
    setProducts(newArr);
    console.log({ products });
  };

  console.log('renderizou de novo');

  return (
    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      { !products ? <span>Loading...</span>
        : products.map((item, index) => {
          console.log({ qty: item.productQtt });
          return (
            <div key={ item.id }>
              <img
                style={ { width: '100px' } }
                src={ item.url_image }
                alt={ item.name }
                data-testid={ `${index}-product-img` }
              />
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
              <p data-testid={ `${index}-product-price` }>
                R$
                {item.price.replace('.', ',')}
              </p>
              <button
                type="button"
                name={ item.id }
                data-testid={ `${index}-product-plus` }
                onClick={ () => addProdQtt(item.id) }
              >
                +
              </button>
              <span data-testid={ `${index}-product-qtd` }>{item.productQtt}</span>
              <button
                type="button"
                data-testid={ `${index}-product-minus` }
                onClick={ () => decProdQtt(item.id) }
              >
                -
              </button>
            </div>
          );
        })}
      <footer
        style={ { background: 'gray', bottom: '0', position: 'fixed', padding: '10px' } }
      >
        <span data-testid="checkout-bottom-btn-value">
          {`R$ ${totalValue.toFixed(2).replace('.', ',')}`}
        </span>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => history.push('/checkout') }
        >
          Ver Carrinho
        </button>
      </footer>
    </div>
  );
}
