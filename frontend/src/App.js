import { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Country from './components/Country';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div>

      <h1> RestCountries Secure App</h1>
      {!loggedIn ? (
        <>
          <Register />
          <Login onLogin={() => setLoggedIn(true)} />
        </>
      ) : (
        <>
        <button onClick={handleLogout}>Logout</button>

        <Country/>
        </>
      )}

    </div>
  );
}



export default App;
