import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from '../Routes';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [shouldRedirect] = useState(true);

  return (
    <div>
      { shouldRedirect && <Redirect to="/login" /> }
      <Routes />
    </div>
  );
}
