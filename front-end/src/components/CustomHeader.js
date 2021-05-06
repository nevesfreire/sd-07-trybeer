import React from "react";
import { Header } from "semantic-ui-react";

import CustomTopMenu from './CustomTopMenu';

const CustomHeader = ({ message }) => {
  return (
    <Header as="h1" color="orange" textAlign="center">
      <CustomTopMenu />
      <div data-testid="top-title">
        {message}
      </div>
    </Header>
  );
};

export default CustomHeader;
