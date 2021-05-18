import React from 'react';
import PropTypes from 'prop-types';
import {
  ProfileContainer,
  MainComponentContainer,
} from '../styled/AdminContainers.styled';

function Profile({ name, email }) {
  return (
    <MainComponentContainer>
      <ProfileContainer>
        <h1>
          Perfil
        </h1>
        <div className="datas-container">
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
      </ProfileContainer>
    </MainComponentContainer>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Profile;
