import React from 'react';
import { Card, Button, Image, Grid } from 'semantic-ui-react';

export default function CustomCheckout({ index, beer, removeButton }) {
  return (
    <Grid>
      {!beer ? (
       null
      ) : (
        <Card>
          <Card.Content>
            <Image
              data-testid={`${index}-product-img`}
              floated="right"
              size={beer.name === 'Skol Lata 250ml' ? 'mini' : 'tiny'}
              src={beer.url_image}
              alt="imagem de uma bebida"
            />
            <Card.Header data-testid={`${index}-product-name`}>
              {beer[3]}
            </Card.Header>

            <Card.Meta data-testid={`${index}-product-total-value`}>
              {`R$ ${(beer[1] * beer[2]).toFixed(2).replace('.', ',')}`}
            </Card.Meta>

            <Card.Description data-testid={`${index}-product-qtd-input`}>
              Unidades: {beer[2]}
            </Card.Description>
            <Card.Description data-testid={`${index}-product-unit-price`}>
              {`(R$ ${beer[1].replace('.', ',')} un)`}
            </Card.Description>
            <Button
              floated="right"
              inverted
              color="red"
              size="mini"
              data-testid={`${index}-removal-button`}
              onClick={() => {
                removeButton(beer[0]);
              }}
            >
              X
            </Button>
          </Card.Content>
        </Card>
      )}
    </Grid>
  );
}
