import React, {useEffect, useState} from "react";
import {getStorage} from "../../services/localStorage";
import {Header, CardOrderDetail} from "../../components";

function OrderDetails({
  history,
  match: {
    params: {id},
  },
}) {
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getStorage("user");
    if (!user) {
      history.push("/login");
    }
    const data = getStorage("cart");
    setCart(data[id - 1]);
    setIsLoading(false);
  }, [history]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header headerTitle="Detalhes do Pedido" data-testid="top-title" />
      <div>
        <div data-testid="order-number">{`Pedido ${id}`}</div>
        <div data-testid="order-date">{cart.sale_date}</div>
        <div>
          {cart.products.map((product, index) => {
            return <CardOrderDetail key={index} product={product} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
