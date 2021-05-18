import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Image, Modal, Icon, Header } from 'semantic-ui-react';

export default function CustomCheckout({ index, beer, removeButton }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      style={ {
        width: 200,
        margin: '10px 10px 20px 5px',
        boxShadow: '5px 5px 4px rgba(0, 0, 0, 2)' } }
    >
      <Image
        centered
        data-testid={ `${index}-product-img` }
        // floated="right"
        size="tiny"
        src={ beer[4] }
        alt="imagem de uma bebida"
      />
      <Card.Content>
        <Card.Header data-testid={ `${index}-product-name` }>
          {beer[3]}
        </Card.Header>

        <Card.Meta data-testid={ `${index}-product-total-value` }>
          {`R$ ${(beer[1] * beer[2]).toFixed(2).replace('.', ',')}`}
        </Card.Meta>

        <Card.Description data-testid={ `${index}-product-qtd-input` }>
          {`Unidades: ${beer[2]}`}
        </Card.Description>
        <Card.Description data-testid={ `${index}-product-unit-price` }>
          {`(R$ ${beer[1].replace('.', ',')} un)`}
        </Card.Description>
      </Card.Content>

      <Modal
        basic
        onClose={ () => setOpen(false) }
        onOpen={ () => setOpen(true) }
        open={ open }
        size="small"
        trigger={
          <Button
            color="red"
            size="mini"
            data-testid={ `${index}-removal-button` }
          >
            X
          </Button>
        }
      >
        <Header icon>
          Tem certeza que deseja excluir este item?
        </Header>

        <Modal.Actions>
          <Button centered basic positive inverted onClick={ () => setOpen(false) }>
            <Icon name="remove" />
            Não
          </Button>
          <Button
            color="red"
            inverted
            onClick={ () => {
              removeButton(beer[0]);
              setOpen(false);
            } }
          >
            <Icon name="checkmark" />
            Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </Card>
  );
}

CustomCheckout.propTypes = {
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape({
    name: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
  removeButton: PropTypes.func.isRequired,
};
