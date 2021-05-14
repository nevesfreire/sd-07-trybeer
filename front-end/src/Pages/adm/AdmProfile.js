import React from 'react';
import { Redirect } from 'react-router-dom';
import SidebarAdm from '../../Components/SidebarAdm';

function AdmProfile() {
  const admInfo = JSON.parse(localStorage.getItem('user'));

  if (!localStorage.getItem('user')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <SidebarAdm />
      <div data-testid="profile-name">
        Name:
        {admInfo.name}
      </div>
      <div data-testid="profile-email">
        Email:
        {admInfo.email}
      </div>
    </div>
  );
}

export default AdmProfile;
