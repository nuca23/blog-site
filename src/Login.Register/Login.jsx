import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AuthComponent = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const formFields = [
    {
      id: 1,
      name: 'user',
      type: 'text',
      placeholder: 'Username',
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      required: true,
    },
    {
      id: 2,
      name: 'pwd',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      required: true,
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apitest.reachstar.io/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: pwd }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('success', true);
        navigate('/news', { state: { email: user } });
      } else {
        const result = await response.json();
        setAuthError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setAuthError('An error occurred. Please try again later.');
    }
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    setUser('');
    setPwd('');
    setAuthError('');
  };

  const linkStyles = {
    textDecoration: 'none',
    color: 'blue',
    marginLeft: '5px', 
    fontSize: '16px' 
  };

  return (
    <div className="authorization-container">
      {!isAuthenticated ? (
        <div>
          <h2>Login</h2>
          {authError && <p className="error-message">{authError}</p>}
          <form className="login-form" onSubmit={handleFormSubmit}>
            {formFields.map((field) => (
              <div key={field.id}>
                <label>{field.label}</label><br />
                <input
                  type={field.type}
                  value={field.name === 'user' ? user : pwd}
                  onChange={(e) => field.name === 'user' ? setUser(e.target.value) : setPwd(e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  style={{ width: '100%' }} 
                />
                <br />
              </div>
            ))}
            <button className="submit-button" type="submit">Login</button>
            <div className="register-link-container">
              <p className='no-account'>Don't have an account?</p>
              <Link style={linkStyles} to="/register">Register</Link>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
