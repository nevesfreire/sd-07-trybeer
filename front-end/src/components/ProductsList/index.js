import { Card, CardDeck, Row, Col, Button } from 'react-bootstrap';
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
      const response = await getProducts(currentUser.token).then(
        (apiResponse) => apiResponse,
      );

      if (newProductsList && newProductsList.length > 0) {
        return setProducts(newProductsList);
      }
      setProducts(response.map((item) => ({ ...item, productQtt: 0 })));
    };

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
        <CardDeck
          style={ { width: '200rem' } }
          className="d-flex justify-content-center"
        >
          {products.map((item, index) => (
            <Card
              key={ item.id }
              style={ { width: '10rem', background: 'transparent', color: 'rgb(232,214,210)' } }
              className="align-self-center text-center"
            >
              <Card.Img
                className="align-self-center"
                style={ { width: '10rem', background: 'transparent' } }
                variant="top"
                src={ item.url_image }
                alt={ item.name }
                data-testid={ `${index}-product-img` }
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-product-name` }>
                  {item.name}
                </Card.Title>
                <Card.Text data-testid={ `${index}-product-price` }>
                  {`R$ ${item.price.replace('.', ',')}`}
                </Card.Text>
                <Row>
                  <Col>
                    <Button
                      type="button"
                      data-testid={ `${index}-product-plus` }
                      onClick={ (e) => addProdQtt(e, item.id) }
                    >
                      +
                    </Button>
                  </Col>
                  <Col>
                    <p data-testid={ `${index}-product-qtd` }>
                      {item.productQtt}
                    </p>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      data-testid={ `${index}-product-minus` }
                      onClick={ () => decProdQtt(item.id) }
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
      )}
      <footer
        style={ {
          background: 'gray',
          bottom: '0',
          position: 'fixed',
          padding: '10px',
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
