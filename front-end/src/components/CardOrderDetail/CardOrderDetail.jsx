import React, { useEffect } from "react";
import {getStorage} from "../../services/localStorage";
import {useHistory} from "react-router-dom";

function CardOrderDetail(props) {
  const {product, index} = props;
  const total = parseFloat(product.price * product.quantity).toFixed(2);
  const history = useHistory();

  useEffect(() => {
    const user = getStorage("user");
    if (!user) {
      history.push("/login");
    }
  }, [history]);

  return (
    <div>
      <div data-testid={`${index}-product-name`}>{product.name}</div>
      <div data-testid={`${index}-product-qtd`}>{product.quantity}</div>
      <div data-testid={`${index}-product-total-value`}>{`R$ ${total
        .toString()
        .replace(".", ",")}`}</div>
    </div>
  );
}

export default CardOrderDetail;
