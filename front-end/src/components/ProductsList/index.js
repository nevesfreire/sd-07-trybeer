import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../services/apiService';

export default function ProductsList() {
  const totalVal = JSON.parse(localStorage.getItem('total'));
  const [totalValue, setTotalValue] = useState(totalVal || 0);
  const [products, setProducts] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const newProductsList = JSON.parse(localStorage.getItem('newProdList'));
      if (!currentUser) return null;
      const response = await getProducts(currentUser.token)
        .then((apiResponse) => apiResponse);

      if (newProductsList && newProductsList.length > 0) {
        return setProducts(newProductsList);
      }
      setProducts(response.map((item) => ({ ...item, productQtt: 0 })));
    };
    const productsLocalStorage = JSON.parse(localStorage.getItem('productsList'));

    if (!productsLocalStorage || productsLocalStorage.length === 0) {
      localStorage.setItem('productsList', JSON.stringify([]));
    }
    fetchProducts();
  }, []);

  const addProdQtt = (e, id) => {
    e.preventDefault();
    const searchedProduct = products.find((elem) => elem.id === id);
    const index = products.indexOf(searchedProduct);
    const newArr = [...products];
    newArr[index].productQtt += 1;
    const floatPrice = parseFloat(searchedProduct.price);
    setProducts(newArr);
    localStorage.setItem('newProdList', JSON.stringify(newArr));
    const { name, productQtt } = newArr[index];
    const productsArray = JSON.parse(localStorage.getItem('productsList'));
    const totalPrice = floatPrice * productQtt;
    localStorage.setItem(
      'productsList',
      JSON.stringify([...productsArray, { name, totalPrice, productQtt }]),
    );
    localStorage.setItem('total', totalValue + floatPrice);
    setTotalValue(totalValue + floatPrice);
  };

  const decProdQtt = (id) => {
    const searchedProduct = products.find((e) => e.id === id);
    const index = products.indexOf(searchedProduct);
    if (searchedProduct.productQtt === 0) {
      return null;
    }
    const newArr = [...products];
    newArr[index].productQtt -= 1;
    const floatPrice = parseFloat(searchedProduct.price);
    setProducts(newArr);
    localStorage.setItem('newProdList', JSON.stringify(newArr));
    const { name, productQtt } = newArr[index];
    const productsArray = JSON.parse(localStorage.getItem('productsList'));
    const totalPrice = floatPrice * productQtt;
    localStorage.setItem(
      'productsList',
      JSON.stringify(
        [...productsArray, { name, totalPrice: totalPrice / productQtt, productQtt }],
      ),
    );
    localStorage.setItem('total', totalValue - floatPrice);
    setTotalValue(totalValue - floatPrice);
  };

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      { !products ? <p>Loading...</p>
        : products.map((item, index) => (
          <div key={ item.id }>
            <img
              style={ { width: '100px' } }
              src={ item.url_image }
              alt={ item.name }
              data-testid={ `${index}-product-img` }
            />
            <p data-testid={ `${index}-product-name` }>{item.name}</p>
            <p data-testid={ `${index}-product-price` }>
              {`R$ ${item.price.replace('.', ',')}`}
            </p>
            <button
              type="button"
              data-testid={ `${index}-product-plus` }
              onClick={ (e) => addProdQtt(e, item.id) }
            >
              +
            </button>
            <p data-testid={ `${index}-product-qtd` }>{item.productQtt}</p>
            <button
              type="button"
              data-testid={ `${index}-product-minus` }
              onClick={ () => decProdQtt(item.id) }
            >
              -
            </button>
          </div>
        ))}
      <footer
        style={ { background: 'gray', bottom: '0', position: 'fixed', padding: '10px' } }
      >
        <p data-testid="checkout-bottom-btn-value">
          {`R$ ${totalValue.toFixed(2).replace('.', ',')}`}
        </p>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => history.push('/checkout') }
          disabled={ totalValue === 0 }
        >
          Ver Carrinho
        </button>
      </footer>
    </div>
  );
}
