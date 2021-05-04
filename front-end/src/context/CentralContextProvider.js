import PropTypes from 'prop-types';
import React, { useState /* useEffect */ } from 'react';
import Context from './Context';

function CentralContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);

  return (
    <Context.Provider
      value={ {
        isFetching,
        setIsFetching,
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
