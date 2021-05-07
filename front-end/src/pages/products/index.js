import React, { useContext } from 'react';
import { Prices, Images, Texts, SalesCar } from '../../components/index';
import Counts from '../../components/Counts';
import TrybeerContext from '../../context/TrybeerContext';

export default function Product() {
  const { priceCar } = useContext(TrybeerContext);

  return (
    <div>
      <Prices value={ 6.57 } />
      <Images value="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.imigrantesbebidas.com.br%2Fbebida%2Fimages%2Fproducts%2Ffull%2F132_Cerveja_Skol_Pilsen_Lata_350ml.jpg&imgrefurl=https%3A%2F%2Fwww.imigrantesbebidas.com.br%2Fcerveja-skol-pilsen-lata-350ml&tbnid=ErYT02iaCBZg6M&vet=12ahUKEwiB0NL7trjwAhWgr5UCHTNFDDoQMygBegUIARDtAQ..i&docid=UPBDV9bOoEBkKM&w=1180&h=2186&q=imagem%20de%20lata%20de%20cerveja&ved=2ahUKEwiB0NL7trjwAhWgr5UCHTNFDDoQMygBegUIARDtAQ" />
      <Texts value="Cerveja Itaipava Lata 350ml" />
      <Counts price={ 6.57 } />
      <SalesCar value={ priceCar } />
    </div>
  );
}
