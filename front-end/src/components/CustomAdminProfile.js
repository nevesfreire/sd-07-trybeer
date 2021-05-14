import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import PropTypes from 'prop-types';

const CustomAdminProfile = ({
  email: emailL,
  name: nameL,
}) => (
  <div>
    <h1>Perfil</h1>
    <p data-testid="profile-name">
      Nome:
      { nameL }
    </p>
    <p data-testid="profile-email">
      Email:
      { emailL }
    </p>
  </div>
);

CustomAdminProfile.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CustomAdminProfile;
