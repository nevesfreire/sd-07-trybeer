import React from 'react';

function Card() {
  return (
    <div data-testid={ `${index}-order-card-container` }>
      <div>
        <h2 data-testid={ `${index}-order-number` }>{}</h2>
        <h3 data-testid={ `${index}-order-total-value` }>{}</h3>
      </div>
      <p data-testid={ `${index}-order-date` }>{}</p>
    </div>
  );
}

export default Card;
