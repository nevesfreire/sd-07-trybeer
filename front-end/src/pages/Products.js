import React from 'react';
import TopBarComponent from '../components/TopBarComponent';
import SideBarComponent from '../components/SideBarComponent';
import AdminComponent from '../components/AdminComponent';

function Products() {
  return (
    <>
      <TopBarComponent>TryBeer</TopBarComponent>
      <SideBarComponent Component={ AdminComponent } />
    </>
  );
}

export default Products;
