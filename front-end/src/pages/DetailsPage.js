import React from 'react';
import MenuTop from '../components/MenuTop';
import Details from '../components/Details';

function DetailsPage() {
  
  return (
    <div className="form-page">
      <MenuTop title="Detalhes de Pedido"/>
      <Details item={item} index={index} />
    </div>
  );
}

export default DetailsPage;