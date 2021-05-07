import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function CentralContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [isExistEmail, setIsExistEmail] = useState(false);

  return (
    <Context.Provider
      value={ {
        isFetching,
        setIsFetching,
        isExistEmail,
        setIsExistEmail,
      } }
    >
      {children}
    </Context.Provider>
  );
}

CentralContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CentralContextProvider;
