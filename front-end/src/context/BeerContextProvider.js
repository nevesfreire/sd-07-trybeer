import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import BeerContext from './BeerContext';

function BeerContextProvider({ children }) {
  const [allBeers, setAllBeers] = useState([]);
  const [saleDetails, setSaleDetails] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (allBeers !== undefined) {
      setIsFetching(false);
    }
  }, [allBeers]);

  return (
    <BeerContext.Provider
      value={ {
        isFetching,
        setIsFetching,
        allBeers,
        setAllBeers,
        saleDetails,
        setSaleDetails,
        errorMessage,
        setErrorMessage,
      } }
    >
      {children}
    </BeerContext.Provider>
  );
}

BeerContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BeerContextProvider;
