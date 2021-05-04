import React, { useState } from 'react';
import Routes from '../Routes';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

export default function App() {
  const [shouldRedirect] = useState(true);

  return (
    <div>
      { shouldRedirect && <Redirect to="/login" /> }
      <Routes />
    </div>
  );
}
