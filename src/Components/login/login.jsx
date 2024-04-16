import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/login', { email: username, password });
      console.log('Response: ',response); //log the entire response object
      console.log('Login Successful:', response.data); //attempt to acess the 'data' property
      setError('');
      
      // Redirect to homepage
    } catch (error) {
      console.error('Login Failed:', error.response.data);
      setError('Invalid email or password');
    }
  };

  return (
    <main className='web-container'>
      <div className="login-container">
        <div className="login-content">
          <div className='image-container'>
            <img src="https://i.pinimg.com/564x/09/53/ab/0953abe75ec46f3e99a037cc208034db.jpg" alt="Image" className="login-image" />
          </div>
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <label className='email-label'>Enter your email to login:</label>
              <input
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              <button type="submit" className='continue'>Continue</button>
              <hr className='divider' />
              <label className='or-label'>Or</label>
              <label className='text'>By continuing, you agree to the term of Sales, Service and Privacy Policies.</label>
              <button type="google" className='google-button'>Continue with Google</button>
              <div className='button-spacing'></div>
              <button type="facebook" className='facebook-button'>Continue with Facebook</button>
              <p>
                Don't have an account yet? SIGN-UP
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
