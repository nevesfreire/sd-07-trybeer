import React from 'react';
// import { Redirect } from 'react-router-dom';
import Routes from '../Routes';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  // const [shouldRedirect] = useState(true);

  return (
    <div>
      {/* { shouldRedirect && <Redirect to="/login" /> } */}
      <Routes />
    </div>
  );
}
