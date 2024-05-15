import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './pages/Menu';
import Story from './pages/Story';
import Location from './pages/Location';
import Tables from "./pages/Tables";
import Footer from './Components/Footer';
import LoginPopup from './Components/loginpop';
import SignupPopup from './Components/signupop';
import Reservation from './pages/reservation';
import Cart from './pages/Takeawaycart';
import ProfilePage from './pages/profile_page';
import SettingsPage from './pages/settings';
import { UserProvider } from './Components/UserContext';


function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showCart,setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItems , setSelectedItems] = useState([]);
  const [tableStatus, setTableStatus] = useState({});




  const openLoginPopup = () => {
    setShowLoginPopup(true);
    console.log('Login popup opened');
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
    setShowLoginPopup(false);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
  };

  const handleLogin = () => {
    // Define your login logic here
    console.log("Login successful");
    setIsLoggedIn(true);
    
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowReservation(false);
    setShowProfile(false);
    setShowSettings(false);
    window.location.reload();
  };
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Navbar onOpenLoginPopup={openLoginPopup} onOpenSignupPopup={openSignupPopup} setSelectedItems= {setSelectedItems} selectedItems= {selectedItems} tableStatus={tableStatus} setTableStatus={setTableStatus} onOpenProfile={() => setShowProfile(true)} onOpenReservation={() => setShowReservation(true)} onOpenCart={()=>setShowCart(true)}  isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
          <div className='main-content'>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Menu" exact component={() => <Menu isLoggedIn={isLoggedIn} handleLogin={handleLogin} selectedItems={selectedItems} setSelectedItems ={setSelectedItems}/>} />
              <Route path="/Story" exact component={Story} />
              <Route path="/Location" exact component={Location} />
              <Route path="/Tables" exact render={() => <Tables isLoggedIn={isLoggedIn} handleLogin={handleLogin} tableStatus={tableStatus} setTableStatus={setTableStatus}/>} />
            </Switch>
            {showLoginPopup && <LoginPopup onClose={closeLoginPopup} onOpenSignupPopup={openSignupPopup} handleLogin={handleLogin} />}
            {showSignupPopup && <SignupPopup onClose={closeSignupPopup} onOpenLoginPopup = {openLoginPopup} handleLogin={handleLogin} />}
            {showReservation && <Reservation onClose={() => setShowReservation(false)} tableStatus={tableStatus} setTableStatus={setTableStatus}/>}
            {showCart && <Cart onClose={() => setShowCart(false)} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>}
            {showProfile && <ProfilePage onClose={() => setShowProfile(false)}  handleLogout={handleLogout} onOpenSettings = {()=> setShowSettings(true)}/>}
            {showSettings && <SettingsPage onClose={()=> setShowSettings(false)} />}
          </div>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
