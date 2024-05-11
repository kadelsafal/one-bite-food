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
  const [role, setRole] = useState('admin');

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
        body: JSON.stringify({ ...values, role }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.success) {
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
          <h3>Enter your email to log in</h3>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleInput}
            required
          />
          {errors.email && <span className='text-error'>{errors.email}</span>}
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            onChange={handleInput}
            required
          />
          {errors.password && <span className='text-error'>{errors.password}</span>}
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value='admin'>Admin</option>
            <option value='waiter'>Waiter</option>
          </select>
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
