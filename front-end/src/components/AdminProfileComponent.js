import React, { useState, useEffect } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';

function AdminProfileComponent() {
  const [formData, setFormData] = useState({});

  const setValue = () => {
    if (getUser() !== null) {
      const { name, email } = getUser();
      setFormData({ name, email });
    }
  };

  useEffect(() => {
    setValue();
  }, []);

  if (getUser() === null || getUser().role !== 'administrator') {
    return <Redirect to="/login" />;
  }

  return (
    <Sidebar.Pusher>
      <Segment basic>
        <p data-testid="profile-name">
          Nome:
          {formData.name}
        </p>
        <p data-testid="profile-email">
          Email:
          {formData.email}
        </p>
      </Segment>
    </Sidebar.Pusher>
  );
}

export default AdminProfileComponent;
