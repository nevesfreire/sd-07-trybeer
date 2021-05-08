import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function CardOrder(props) {
  const {order, index} = props;
  const {sale_date: saleDate} = order;
  const dSplited = saleDate.split("/");
  const formatedDate = `${dSplited[0]}/${dSplited[1]}`;
  const total = parseFloat(order.total_price).toFixed(2);

  return (
    <Link to={`/orders/${order.id}`}>
      <div style={{marginLeft: "300px"}} data-testid={`${index}-order-card-container`}>
        <div data-testid={`${index}-order-number`}>{`Pedido ${order.id}`}</div>

        <div data-testid={`${index}-order-date`}>{formatedDate}</div>

        <div data-testid={`${index}-order-total-value`}>{`R$ ${total.toString().replace(".", ",")}`}</div>
      </div>
    </Link>
  );
}

CardOrder.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    total_price: PropTypes.number,
    sale_date: PropTypes.string,
  }).isRequired,
};

export default CardOrder;
