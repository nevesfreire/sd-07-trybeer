import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken } from '../helpers/localStorage';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomAdminProfile from '../components/CustomAdminProfile';
import './pagesStyles.css';

function AdminProfile() {
  const [formDataUpdate, setFormDataUpdate] = useState(new Map());
  console.log(setFormDataUpdate);
  const history = useHistory();
  const userObject = getToken() || {};
  const { name, email, token, role } = userObject;

  useEffect(() => {
    if (!token || role === 'client') return history.push('/login');
  }, [history, role, token]);

  return (
    <div>
      <div className="profile-container">
        <CustomSideBarAdmin />
        <CustomAdminProfile
          name={ name }
          email={ email }
          formDataUpdate={ formDataUpdate }
        />
      </div>
    </div>
  );
}

export default AdminProfile;
