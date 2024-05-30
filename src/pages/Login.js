import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);

  const history = useHistory();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const data = await response.json();
      if (response.ok) {
        if (data.success) {
          // Store the user's role in local storage
          localStorage.setItem('role', data.role);
          setLoginStatus({ success: true, message: data.message });
          setTimeout(() => {
            history.push('/dashboard');
          }, 2000);
        } else {
          setLoginStatus({ success: false, message: data.message });
        }
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error) {
      setErrors({ message: 'Failed to log in. Please try again later.' });
    }
  };

  return (
    <div className='login-container'>
      <div className='login-content'>
        <div className='login-header'>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type='email'
              id="email"
              name='email'
              placeholder='Enter your email'
              onChange={handleInput}
              required
            />
          </div>
          {errors.email && <span className='text-error'>{errors.email}</span>}
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type='password'
              id="password"
              name='password'
              placeholder='Enter your password'
              onChange={handleInput}
              required
            />
          </div>
          {errors.password && <span className='text-error'>{errors.password}</span>}
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className='login-pic'>
        <img
          src='https://i.pinimg.com/564x/93/ad/63/93ad63c4dafc8032f9af43b09556c63f.jpg'
          alt='img'
        />
      </div>

      {loginStatus && (
        <div className={`login-dialog ${loginStatus.success ? 'success' : 'error'}`}>
          <p>{loginStatus.message}</p>
          <button onClick={() => setLoginStatus(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;
