import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/loginpop.css';
import pic from '../assets/pexels-pixabay-416471.jpg';
import { useHistory } from 'react-router-dom';
import SignupPopup from '../Components/signupop';

function LoginPopup({ onClose, handleLogin }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      if (data.success) {
        console.log('Logged in as:', data.user.name);
        setLoginStatus({ success: true, message: 'Logged in successfully' });
        setTimeout(() => {
          history.push('/Menu');
          handleLogin();
          onClose();
        }, 2500);
      } else {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          <div className="close">
            <button className="close-btn" onClick={onClose}>X</button>
          </div>
          <div className="popup-header">
            <h2>Login</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <h3>Enter your email to log in</h3>
            <input type="email" id="email" name="email" placeholder="Enter your email" onChange={handleInput} required />
            {errors.email && <span className="text-error">{errors.email}</span>}
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={handleInput} required />
            {errors.password && <span className="text-error">{errors.password}</span>}
            <button type="submit">Login</button>
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
            <button className="signtext" onClick={openSignupPopup}> <p>npm install -g eslint</p></button>
          </div>
        </div>
        <div className="popup-pic">
          <img src={pic} alt="img" />
        </div>
      </div>

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
LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose should be a function and is required
  handleLogin: PropTypes.func.isRequired, // handleLogin should be a function and is required
};

export default LoginPopup;
