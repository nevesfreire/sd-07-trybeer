import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Media, Image, Heading } from 'react-bulma-components';
import TrybeerContext from '../store/context';

function ProductCard({ item, index }) {
  const cart = useContext(TrybeerContext);
  const { name, urlImage } = item;
  let { price } = item;
  price = price.split('.').join(',');

  const verifyQuantity = cart.cart && cart.cart[item.id]
    ? cart.cart[item.id].quantity : 0;

  const add = () => {
    cart.addToCart(item);
  };
  /*   const sumQtt = (element) => {
      setQtt(qtt + 1);
      addProductsToCart(element, { qtt: qtt + 1 });
    }; */
  const subQtt = () => {
    // const zero = 0;
    // if (qtt > zero) {
    cart.removeToCart(item);
    // }
  };

  return (
    <Card
      className="is-flex column m-2 is-align-items-center mt-5"
      style={ { maxWidth: '23rem', minWidth: '23rem', minHeight: '14rem', maxHeight: '14rem' } }
    >
      {/* <Card.Content>
        <Media.Item renderAs="figure" align="left">
          <Image
            data-testid={ `${index}-product-img` }
            size={ 64 }
            alt="64x64"
            src={ urlImage }
          />
        </Media.Item>
        <Media.Content>
          <Heading
            data-testid={ `${index}-product-name` }
            size={ 6 }
          >
            {name}
          </Heading>
          <Heading subtitle size={ 6 } data-testid={ `${index}-product-price` }>
            {`R$ ${price}`}
          </Heading>
        </Media.Content>
      </Card.Content>
      <div className="is-inline-flex">
        <Button
          data-testid={ `${index}-product-minus` }
          onClick={ () => subQtt() }
        >
          <FontAwesomeIcon icon={ faMinus } fixedWidth />
        </Button>
        <div
          className="m-4"
          data-testid={ `${index}-product-qtd` }
        >
          {verifyQuantity}
        </div>
        <Button
          data-testid={ `${index}-product-plus` }
          onClick={ () => add() }
        >
          <FontAwesomeIcon icon={ faPlus } fixedWidth />
        </Button>
      </div> */}
      <div className="card-content is-align-items-center">
        <div className="media mb-6">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={ urlImage } alt="Placeholder"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-4">{`R$ ${price}`}</p>
          </div>
        </div>

        <footer
          className="card-footer media-center is-inline-flex is-align-items-center ml-5"
          style={ { maxWidth: '16rem', minWidth: '16rem' } }
        >
          <Button
            className="card-footer-item is-black is-outlined"
            data-testid={ `${index}-product-minus` }
            onClick={ () => subQtt() }
          >
            <FontAwesomeIcon icon={ faMinus } fixedWidth />
          </Button>
          <div
            className="m-4 card-footer"
            data-testid={ `${index}-product-qtd` }
          >
            {verifyQuantity}
          </div>
          <Button
            className="card-footer-item is-black is-outlined"
            data-testid={ `${index}-product-plus` }
            onClick={ () => add() }
          >
            <FontAwesomeIcon icon={ faPlus } fixedWidth />
          </Button>
        </footer>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
