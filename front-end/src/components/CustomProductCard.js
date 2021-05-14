import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import CentralContext from '../context/Context';
import { loadItemsToLocalStorage } from '../helpers/localStorage';

export default function CustomProductCard({ index, beer: product }) {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  const [qtdProduct, setQtdProduct] = useState(0);

  useEffect(() => {
    let localQnt = 0;
    const kart = JSON.parse(localStorage.getItem('cart'));
    kart && kart.map((item) => {
      if (item[0] === product.id) { localQnt = item[2]; }
    });
    setQtdProduct(localQnt);
  }, [product.id]);

  useEffect(() => {}, [qtdProduct]);

  const saveToLocalMore = (productArr, qtdProd) => {
    const { id, price, name, url_image: urlImage } = productArr;
    const qtd = qtdProd + 1;
    const loadItemsData = { id, price, qtd, name, urlImage };
    loadItemsToLocalStorage(loadItemsData);
  };

  const saveToLocalLess = (productArr, qtdProd) => {
    const { id, price, name, url_image: urlImage } = productArr;
    const qtd = qtdProd - 1;
    const loadItemsData = { id, price, qtd, name, urlImage };
    loadItemsToLocalStorage(loadItemsData);
  };

  return (
    <div>
      {!product ? (
        'loading'
      ) : (
        <Card>
          <Card.Content>
            <Image
              data-testid={ `${index}-product-img` }
              floated="right"
              size={ product.name === 'Skol Lata 250ml' ? 'mini' : 'tiny' }
              src={ product.url_image }
              alt="imagem de uma bebida"
            />
            <Card.Header data-testid={ `${index}-product-price` }>
              {' '}
              {`R$ ${product.price.replace('.', ',')}`}
            </Card.Header>
            <Card.Meta data-testid={ `${index}-product-name` }>
              {product.name}
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
                  setTotalKart(totalKart + Number(product.price));
                  saveToLocalMore(product, qtdProduct);
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
                  (qtdProduct > 0) && setQtdProduct(qtdProduct - 1);
                  (qtdProduct > 0) && setTotalKart(totalKart - Number(product.price));
                  (qtdProduct > 0) && saveToLocalLess(product, qtdProduct);
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
