import React, { useState } from 'react';
import { getToken } from '../helpers/localStorage';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomAdminProfile from '../components/CustomAdminProfile';

function AdminProfile() {
  const { email, name } = getToken();
  const [formDataUpdate, setFormDataUpdate] = useState(new Map());

  return (
    <div>
      < CustomSideBarAdmin/>
      <CustomAdminProfile
        name={ name }
        email={ email }
        formDataUpdate={ formDataUpdate }
      />
    </div>
  );
}

export default AdminProfile;
