import { useEffect, useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Country from './components/Country';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode';
import AdminPanel from './components/AdminLogs';

function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token && isTokenValid(token);
  });

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const isAdmin = decodedToken?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('apiKey');
    setLoggedIn(false);
  };

  useEffect(() => {
    if (token && decodedToken) {
      const timeLeft = (decodedToken.exp * 1000) - Date.now();

      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          handleLogout();
          alert('Session expired. Please login again.');
        }, timeLeft);
        return () => clearTimeout(timer);
      } else {
        handleLogout();
      }
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar
        loggedIn={loggedIn}
        onLogout={handleLogout}
        showAdminPanel={showAdminPanel}
        setShowAdminPanel={setShowAdminPanel}
      />

      <div className="container my-5 flex-grow-1 d-flex align-items-center justify-content-center">
        {!loggedIn ? (
          <div
            className="card p-0 w-100"
            style={{ maxWidth: "1000px", overflow: "hidden" }}
          >
            <div className="row g-0">
              <div className="col-md-6 form-section border-end border-1 border-light">
                <h3 className="form-heading">Create an Account</h3>
                <Register />
              </div>

              <div className="col-md-6 form-section">
                <h3 className="form-heading">Login to Continue</h3>
                <Login onLogin={() => setLoggedIn(true)} />
              </div>
            </div>
          </div>

        ) : (
          <>
            
            {isAdmin && showAdminPanel ?(<AdminPanel />) :(<Country />)}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
