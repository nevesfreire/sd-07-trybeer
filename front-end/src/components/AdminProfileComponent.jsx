import React from 'react';
import PropTypes from 'prop-types';

function Profile({ name, email }) {
  return (
    <div>
      <h1>
        Perfil
      </h1>
      <div>
        <p>
          Nome:
          <span data-testid="profile-name">
            { name }
          </span>
        </p>
        <p>
          Email:
          <span data-testid="profile-email">
            { email }
          </span>
        </p>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Profile;
