import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ComponentAdmin from '../components/Admin';

const Admin = (props) => {
  const { history } = props;
  return(
          <div className="container-register">
            <Header title="Trybeer" />
            <Menu path={ history } />
            <ComponentAdmin />
          </div>
        );
};

export default Admin;
