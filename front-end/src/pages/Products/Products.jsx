import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
/* import {Link} from "react-router-dom";
import {Card} from "../../components/Card";
import * as API from "../../services/api"; */
import { getStorage } from '../../services/localStorage';
import { Header } from '../../components';

function Products() {
  useEffect(() => {
    if (!getStorage('cart')) {
      // chama api
    }
  }, []);

  // const totalPrice = useSelector((state) => state.client.totalPrice);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Products;
