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
    kart && kart.map((item) => {
      if (item[0] == beer.id) {
        localQnt = item[2];
      }
    });
    setQtdProduct(localQnt);
  }, []);

  useEffect(() => {}, [qtdProduct]);

  return (
    <div>
      {!beer ? (
        'loading'
      ) : (
        <Card>
          <Card.Content>
            <Image
              data-testid={ `${index}-product-img` }
              floated="right"
              size={ beer.name === 'Skol Lata 250ml' ? 'mini' : 'tiny' }
              src={ beer.url_image }
              alt="imagem de uma bebida"
            />
            <Card.Header data-testid={ `${index}-product-price` }>
              {' '}
              {`R$ ${beer.price.replace('.', ',')}`}
            </Card.Header>
            <Card.Meta data-testid={ `${index}-product-name` }>
              {beer.name}
            </Card.Meta>
            <Card.Meta data-testid={ `${index}-product-qtd` }>
              {qtdProduct}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                data-testid={ `${index}-product-plus` }
                onClick={ () => {
                  setQtdProduct(qtdProduct + 1);
                  setTotalKart(totalKart + Number(beer.price));
                  saveToLocalMore(beer, qtdProduct);
                } }
                size="mini"
              >
                +
              </Button>
              <Button
                basic
                color="red"
                data-testid={ `${index}-product-minus` }
                onClick={ () => {
                  (qtdProduct > 0) && setQtdProduct(qtdProduct - 1) ;
                  (qtdProduct > 0) && setTotalKart(totalKart - Number(beer.price));
                  (qtdProduct > 0) && saveToLocalLess(beer, qtdProduct);
                } }
                size="mini"
              >
                -
              </Button>
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
