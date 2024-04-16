import React, { useState, useEffect } from 'react';
import '../styles/loginpop.css'; // Import CSS file for styling
import pic from '../assets/pexels-pixabay-416471.jpg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SignupPopup from '../Components/signupop'; // Import the SignupPopup component

function LoginPopup({ onClose, handleLogin }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const openSignupPopup = () => {
    
    setIsSignupPopupOpen(true);
    
  };

  const closeSignupPopup = () => {
    
    setIsSignupPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // values contain login credentials
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      // Check response from backend and handle accordingly
      if (data.success) {
        console.log('Logged in as:', data.user.name);
        // Call handleLogin function to update isLoggedIn state in the Navbar component
                // Redirect to homepage or perform any action on successful login
        setLoginStatus({ success: true, message: 'Logged in successfully' });
        setTimeout(() => {
          history.push('/Menu');
          handleLogin();
          onClose(); // Close the popup
        }, 2000); // Delay for 2 seconds before redirecting
      } else {
        // Handle errors from backend
        console.error('Login failed:', data.message);
        setLoginStatus({ success: false, message: data.message });
        setErrors({ message: data.message });
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrors({ message: 'Failed to log in. Please try again later.' });
    }
  };

  useEffect(() => {
    // Add event listener to disable scrolling when the popup is opened
    document.body.style.overflow = 'hidden';
    // Cleanup function to enable scrolling when the popup is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='popup-container'>
      <div className='popup'>
        <div className='popup-content'>
          <div className="close">
            <button className="close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-header">
            <h2>Login</h2>
          </div>
          <form action='' onSubmit={handleSubmit}>
            <h3>Enter your email to log in</h3>
            <input type="email" id="email" name="email" placeholder="Enter your email"
              onChange={handleInput} required />
            {errors.email && <span className='text-error'>{errors.email}</span>}
            <input type="password" id="password1" name="password" placeholder="Enter your password"
              onChange={handleInput} required />
            {errors.password && <span className='text-error'>{errors.password}</span>}

            <button type='submit'>Login</button>
          </form>

          <div className="text">
            <h3>OR</h3>
          </div>
          <div className="text1">
            <p>By Continuing, you agree to the updated <b>Terms of Sale, Terms of Service </b>and <b>Privacy Policy.</b></p>
          </div>
          <div className="signin-buttons">
            <button className="sign1">Continue with Google</button>
            <button className="sign1">Continue With Facebook</button>
          </div>
          <div className="signin-texts">
            <button className="signtext" onClick={openSignupPopup}>Don't have an account then, SignUp</button>
          </div>
        </div>
        <div className='popup-pic'>
          <img src={pic} alt='img' />
        </div>
      </div>

      {/* Render the SignupPopup component conditionally */}
      {isSignupPopupOpen && <SignupPopup onClose={closeSignupPopup} handleLogin={handleLogin} />}
      
      {loginStatus && (
        <div className={`login-dialog ${loginStatus.success ? 'success' : 'error'}`}>
          <p>{loginStatus.message}</p>
          <button onClick={() => setLoginStatus(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default LoginPopup;
