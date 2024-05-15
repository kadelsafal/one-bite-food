
import  { useState, useEffect,useRef } from 'react'; // Importing useState and useEffect hooks from React
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing menu icons from react-icons library
import Logo from '../assets/vector.png'; // Importing logo image
import Cart from '../assets/shopping cart.png'; // Importing shopping cart icon
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import '../styles/navbar.css'; // Importing CSS styles for the navbar
import icon from '../assets/profile-user_64572 (1).png'; // Importing user profile icon
import Reservation from '../pages/reservation';
import TakeawayCart from '../pages/Takeawaycart';
import ProfilePage from '../pages/profile_page';
import SettingsPage from '../pages/settings';
import PropTypes from 'prop-types'; // Import PropTypes
 // Importing Reservation component

function Navbar({isLoggedIn, handleLogout,selectedItems,setSelectedItems,tableStatus , setTableStatus,  onOpenLoginPopup}) {
   // State variables for managing menu, scroll, login status, and reservation visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State variable for menu visibility
  const [isScrolled, setIsScrolled] = useState(false); // State variable for scroll position
  const [showReservation, setShowReservation] = useState(false);// State variable for reservation popup visibility
  const [showCart, setShowCart] = useState(false) //State variable for cart popup visibility
  const [showProfile,setshowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false);
  const profileRef = useRef(null);
  console.log("Navbar : ",selectedItems);
 // Function to toggle navigation menu
  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
// Effect to update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setshowProfile(false);
        setShowSettings(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
// Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 // Function to handle user login
  
  // Function to handle user logout
  
   // Function to open reservation popup
  const openReservation = () => {
    console.log("Opening reservation")// Log message indicating reservation popup is being opened
    setShowReservation(true);// Set showReservation state to true to display reservation popup
  };
  const openCart = () => {
    console.log ("Opening Cart");//Log message
    setShowCart(true);
  }
  const openProfile = () => {
    setshowProfile(true);
    setShowSettings(false);
  }
  const openSettings = () => {
    setshowProfile(false);
    setShowSettings(true);
  }
  return (
    <header>
      <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className='leftSide'>
          <div className='logos'>
            <img src={Logo} alt='img' />
            <div className='txtheader'>
              <Link to="/"><h1>One Bite Food</h1></Link>
            </div>
          </div>
        </div>

        <div className={`middle ${isMenuOpen ? 'responsive' : ''}`}>
          <Link to="/Menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/Story" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <Link to="/Location" onClick={() => setIsMenuOpen(false)}>Location</Link>
          <Link to="/Tables" onClick={() => setIsMenuOpen(false)}>Tables</Link>
          
          <button className='nav-btn close' onClick={toggleNav}>
            <FaTimes />
          </button>
        </div>

        <button className='nav-btn' onClick={toggleNav}>
          <FaBars />
        </button>

        {/* Conditionally render user icon or empty div based on login status */}
        {isLoggedIn ? (
          <div className='user-icon'>
            <div className='icon'>
              <button className='profile-btn' onClick={openProfile} ><img src={icon} alt='img' /></button>
              
            </div>
          </div>
        ) : (
          <div className='empty'></div>
        )}

        <div className='rightSide'>
          <div className='logo-buttons'>
          
          {isLoggedIn ?(
            <button className='cart' onClick={openCart}><img src={Cart} alt='img' /></button>
          ):(
            <button className='cart' onClick={() => {onOpenLoginPopup(); scrollToTop(true)}}><img src={Cart} alt='img' /></button>
          )}

            <div className='txtbtn'>
              {isLoggedIn ? (
                <button className='book-btn' onClick={openReservation}><h3>Book a Table</h3></button>
              ) : (
                <button className='book-btn' onClick={() => { onOpenLoginPopup(); scrollToTop(true); }}><h3>Book a Table</h3></button>
              )}
            </div>
          </div>
        </div>
      </div>

       {/* Conditionally render Reservation component */}
       {showReservation && (
        <Reservation onClose={() => setShowReservation(false)}  tableStatus={tableStatus} setTableStatus={setTableStatus}/>
      )}
      {showCart && (
        <TakeawayCart onClose={() => setShowCart(false)} showCart={showCart} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      )}
    {showProfile &&(
      <div ref={profileRef}>
        <ProfilePage onClose={() => setshowProfile(false)} handleLogout={handleLogout} onOpenSettings={openSettings} />

      </div>

    )}
    {showSettings && (
      <div ref={profileRef}>
        <SettingsPage onClose={() => setShowSettings(false)} />
        </div>
      )}
     
    </header>
  );
}
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn should be a boolean and is required
  handleLogin: PropTypes.func.isRequired, // handleLogin should be a function and is required
  handleLogout: PropTypes.func.isRequired, // handleLogout should be a function and is required
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  setSelectedItems: PropTypes.func.isRequired,
  tableStatus: PropTypes.object.isRequired,
  setTableStatus: PropTypes.func.isRequired,
  onOpenLoginPopup: PropTypes.func.isRequired
};
export default Navbar;
