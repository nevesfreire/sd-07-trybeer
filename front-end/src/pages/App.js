import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import Routes from '../Routes';

export default function App() {
  const [shouldRedirect] = useState(true);

  return (
    <div>
      { shouldRedirect && <Redirect to="/login" /> }
      <Routes />
    </div>
  );
}
