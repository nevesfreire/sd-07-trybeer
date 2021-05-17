import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import CentralContext from '../context/Context';
import { loadItemsToLocalStorage } from '../helpers/localStorage';

export default function CustomProductCard({ index, beer }) {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  const [qtdProduct, setQtdProduct] = useState(0);

  const saveToLocalMore = (product, qtdProd) => {
    const { id, price, name, url_image: urlImage } = product;
    const qtd = qtdProd + 1;
    loadItemsToLocalStorage({ id, price, qtd, name, urlImage });
  };

  const saveToLocalLess = (product, qtdProd) => {
    const { id, price, name, url_image: urlImage } = product;
    const qtd = qtdProd - 1;
    loadItemsToLocalStorage({ id, price, qtd, name, urlImage });
  };

  useEffect(() => {
    let localQnt = 0;
    const kart = JSON.parse(localStorage.getItem('cart'));
    if (kart) {
      kart.map((item) => {
        const { id } = beer;
        if (item[0] === id) {
          const quantity = item[2];
          localQnt = quantity;
        }
        return localQnt;
      });
    }
    setQtdProduct(localQnt);
  }, [beer, beer.id]);

  useEffect(() => {}, [qtdProduct]);

  function setBtnQtd() {
    if (qtdProduct > 0) {
      setQtdProduct(qtdProduct - 1);
      setTotalKart(totalKart - Number(beer.price));
      saveToLocalLess(beer, qtdProduct);
    }
  }

  return (
    <div>
      {!beer ? (
        'loading'
      ) : (
        <Card
          style={ {
            maxWidth: 200,
            margin: '20px 10px',
            boxShadow: '10px 10px 4px rgba(0, 0, 0, 10)',
          } }
        >
          <Image
            data-testid={ `${index}-product-img` }
            floated="right"
            size={ beer.name === 'Skol Lata 250ml' ? 'mini' : 'tiny' }
            src={ beer.url_image }
            alt="imagem de uma bebida"
            ui={ false }
          />
          <Card.Content style={ { fontWeight: 500 } }>
            <Card.Header data-testid={ `${index}-product-price` }>
              {' '}
              {`R$ ${beer.price.replace('.', ',')}`}
            </Card.Header>
            <Card.Meta data-testid={ `${index}-product-name` }>
              {beer.name}
            </Card.Meta>
            <Card.Description data-testid={ `${index}-product-qtd` }>
              {qtdProduct}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button.Group fluid size="large">
                <Button
                  positive
                  data-testid={ `${index}-product-plus` }
                  onClick={ () => {
                    setQtdProduct(qtdProduct + 1);
                    setTotalKart(totalKart + Number(beer.price));
                    saveToLocalMore(beer, qtdProduct);
                  } }
                >
                  +
                </Button>
                <Button.Or text="ou" />
                <Button
                  data-testid={ `${index}-product-minus` }
                  onClick={ () => setBtnQtd() }
                >
                  -
                </Button>
              </Button.Group>

              {/* <Button
                // basic
                color="orange"
                data-testid={`${index}-product-plus`}
                onClick={() => {
                  setQtdProduct(qtdProduct + 1);
                  setTotalKart(totalKart + Number(beer.price));
                  saveToLocalMore(beer, qtdProduct);
                }}
                size="mini"
              >
                +
              </Button>
              <Button
                basic
                color="red"
                data-testid={`${index}-product-minus`}
                onClick={() => setBtnQtd()}
                size="mini"
              >
                -
              </Button> */}
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}

CustomProductCard.propTypes = {
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape.isRequired,
};
