import React from "react";
import { Header } from "semantic-ui-react";

const CustomHeader = ({ message }) => {
  return (
    <Header as="h1" color="orange" textAlign="center">
      {message}
    </Header>
  );
};

export default CustomHeader;
