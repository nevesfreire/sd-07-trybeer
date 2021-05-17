import { CardDeck, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../services/apiService';
import ProductsCard from './ProductsCard';

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
      const response = await getProducts(currentUser.token).then(
        (apiResponse) => apiResponse,
      );

      if (!totalVal) setTotalValue(0);

      if (newProductsList && newProductsList.length > 0) {
        return setProducts(newProductsList);
      }
      setProducts(response.map((item) => ({ ...item, productQtt: 0 })));
    };

    fetchProducts();
  }, [totalVal]);

  const addProdQtt = (e, id) => {
    e.preventDefault();
    const searchedProduct = products.find((elem) => elem.id === id);
    const index = products.indexOf(searchedProduct);
    const newArr = [...products];
    newArr[index].productQtt += 1;
    const floatPrice = parseFloat(searchedProduct.price);
    setProducts(newArr);
    localStorage.setItem('newProdList', JSON.stringify(newArr));
    localStorage.setItem('total', (totalValue + floatPrice).toFixed(2));
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
    localStorage.setItem('total', (totalValue - floatPrice).toFixed(2));
    setTotalValue(totalValue - floatPrice);
  };

  return (
    <div>
      {!products ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Row className="d-flex justify-content-around flex-row-reverse">
            {products.map((item, index) => (
              <CardDeck
                key={ item.id }
                style={ { width: '18rem', paddingTop: '10px' } }
              >
                <ProductsCard
                  item={ item }
                  index={ index }
                  addProdQtt={ addProdQtt }
                  decProdQtt={ decProdQtt }
                />
              </CardDeck>
            ))}
          </Row>
        </div>
      )}
      <footer
        style={ {
          background: 'gray',
          bottom: '0',
          position: 'fixed',
          padding: '10px',
          width: '68%',
        } }
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
