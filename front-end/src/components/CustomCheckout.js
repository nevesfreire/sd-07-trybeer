import React from 'react';
import { Button, Item, Image } from 'semantic-ui-react';

export default function CustomCheckout({index, beer, removeButton }) {



  return (
    <div>
      {!beer ? (
        'Não há produtos no carrinho'
      ) : (
        <li>
          <div>            
            <p data-testid={`${index}-product-name`}>
            {beer[3]} 
            </p>

            <p data-testid={`${index}-product-total-value`}>
              {`R$ ${(beer[1] * beer[2]).toFixed(2).replace('.', ',')}`}
            </p>

            <p data-testid={`${index}-product-qtd-input`}>
              {beer[2]}
           </p>
           <p data-testid={`${index}-product-unit-price`}>
              {`(R$ ${beer[1].replace('.', ',')} un)`}
           </p>
              <button
                basic
                color="green"
                data-testid={`${index}-removal-button`}
                onClick={() => {
                  removeButton(index)                  
                }}
               
              >
                X
              </button>
          </div>
        </li>
      )}
    </div>
  );
}

