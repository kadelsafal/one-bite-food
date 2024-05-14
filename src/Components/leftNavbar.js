import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory hook
import logo from "../assets/vector.png";
import dashboard from "../assets/dashboard.png";
import menu from "../assets/menu.png";
import setting from "../assets/settings.png";
import analysis from "../assets/analysis.png";
import '../styles/leftNavbar.css';

const Navbar = () => {
  const history = useHistory(); // Initialize useHistory hook
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // State to manage dialog visibility

  // Define handleLogout function
  const handleLogout = () => {
    // Clear any authentication-related data (if any)
    // For example, clear local storage or session storage
    localStorage.removeItem('token'); // Example: Remove authentication token

    // Show logout dialog
    setShowLogoutDialog(true);

    // Redirect to the home page after 2 seconds
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
        <li>
          <img src={setting} alt="Setting" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/setting'>Setting</Link>
        </li>
        <li>
          <img src={analysis} alt="Analysis" style={{ width: '20px', marginRight: '5px' }} />
          <Link to='/analysis'>Analysis</Link>
        </li>
        <li>
          {/* Logout button */}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>

      {/* Logout dialog */}
      {showLogoutDialog && (
        <div className="logout-dialog">
          <p>Successful Logout</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
