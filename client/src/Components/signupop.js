import { useState,useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes if not already imported
import "../styles/signuppop.css";
import pic from "../assets/pexels-pixabay-416471.jpg";

function SignupPopup({ onClose, onOpenLoginPopup}) {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    password1:'',
  });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);
  
  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      const data = await response.json();
      if (data.success) {
        console.log('Signup successful');
        setLoginStatus({ success: true, message: 'Signed up successfully' });
        setTimeout(() => {
          onOpenLoginPopup();
          
        }, 2000);
      } else {
        console.error('Signup failed:', data.message);
        setErrors({ message: data.message });
        setLoginStatus({ success: false, message: data.message });
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setErrors({ message: 'Failed to submit form. Please try again later.' });
      setLoginStatus({ success: false, message: 'Failed to log in' });
    }
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  return (
    <div className='popups-container'>
      <div className='popups'>
        <div className='popups-content'>
          <div className="popups-header">
            <h2>Signup</h2>
            <div className="close">
            <button className="close-btn" onClick={onClose}>X</button>
          </div>
          
          </div>
          <form className='signup' action='' onSubmit={handleSubmit}>
            <h3>Enter your email to Sign Up.</h3>
            <input type="text" id="name" name="name" placeholder="Enter your name" onChange={handleInput} required />
            {errors.name && <span className ='text-error'>{errors.name}</span>}
            <input type="email" id="email" name="email" placeholder="Enter your email" onChange={handleInput} required />
            {errors.email && <span className ='text-error'>{errors.email}</span>}
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={handleInput} required />
            {errors.password && <span className ='text-error'>{errors.password}</span>}
            <input type="password" id="password1" name="password1" placeholder="Re-enter password" onChange={handleInput} required />
            {errors.password1 && <span className ='text-error'>{errors.password1}</span>}
            <button type="submit">Continue</button>
          </form>
        </div>
        <div className='popups-pic'>
          <img src={pic} alt='img' />
        </div>
      </div>
       {loginStatus && (
        <div className={`login-dialog ${loginStatus.success ? 'success' : 'error'}`}>
          <p>{loginStatus.message}</p>
          <button onClick={() => {
            onClose(); // Close the signup popup
            setLoginStatus(null); // Reset login status
          }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

SignupPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  onOpenLoginPopup : PropTypes.func.isRequired
};

export default SignupPopup;
