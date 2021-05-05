import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Card} from "../../components/Card";
import * as API from "../../services/api";
import {getStorage} from "../../services/localStorage";

function Products() {
  useEffect(() => {
    if (!getStorage("cart")) {
      // chama api
    }
  }, []);

  const totalPrice = useSelector((state) => state.clientInfo.totalPrice);

  return <div></div>;
}

export default Products;
