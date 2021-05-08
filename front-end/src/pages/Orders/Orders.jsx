import React, {useState, useEffect} from "react";
import {Header, CardOrder} from "../../components";
import {getStorage} from "../../services/localStorage";
import {useHistory} from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // setIsLoading(false);
    const user = getStorage("user");
    if (!user) {
      history.push("/login");
    }
    const cart = getStorage("purchase");
    setOrders(cart);

  }, []);


  return (
    <div>
      <Header data-testid="top-title">Meus Pedidos</Header>
      {orders.map((order, index) => (
        <CardOrder key={index} order={order} index={index} />
      ))}
    </div>
  );
}

export default Orders;
