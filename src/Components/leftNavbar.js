import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "../assets/vector.png";
import dashboard from "../assets/dashboard.png";
import menu from "../assets/menu.png";
import setting from "../assets/settings.png";
import analysis from "../assets/analysis.png";
import '../styles/leftNavbar.css';

const Navbar = () => {
  const history = useHistory();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [role, setRole] = useState(null);

  // Fetch the user role from local storage when the component mounts
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove the role from local storage
    setShowLogoutDialog(true);
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="One Bite Foods Logo" />
        <h1>One Bite Foods</h1>
      </div>

      <ul>
        <li>
          <img src={dashboard} alt="Dashboard" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <img src={menu} alt="Menu" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/waiter-order'>Waiter Order</Link>
        </li>
        {role === 'admin' && (
          <li>
            <img src={setting} alt="Setting" style={{ width: '20px', marginRight: '5px' }} />
            <Link to='/setting'>Setting</Link>
          </li>
        )}
        {role === 'admin' && (
          <li>
            <img src={analysis} alt="Analysis" style={{ width: '20px', marginRight: '5px' }} />
            <Link to='/analysis'>Analysis</Link>
          </li>
        )}

        <li>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>

      {showLogoutDialog && (
        <div className="logout-dialog">
          <p>Successful Logout</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
