import React from "react";

function CardOrderDetail(props) {
  const {product, index} = props;
  return (
    <div>
      <div data-testid={`${index}-product-name`}>{product.name}</div>
      <div data-testid={`${index}-product-qtd`}>{product.quantity}</div>
      <div data-testid="order-total-value">
        {Number(product.price) * product.quantity}
      </div>
    </div>
  );
}

export default CardOrderDetail;
