import { useState } from 'react';
import PropTypes from 'prop-types';
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

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
    setShowLoginPopup(false);
  };

  const handleLogin = () => {
    console.log("Login successful");
    // You can perform any actions after successful login
  };

  return (
    <div className="App">
      <Router>
        <Navbar onOpenLoginPopup={openLoginPopup} />
        <div className='main-content'>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Menu" exact component={Menu} />
            <Route path="/Story" exact component={Story} />
            <Route path="/Location" exact component={Location} />
            <Route path="/Tables" exact component={Tables} />
          </Switch>
          {showLoginPopup && <LoginPopup onClose={closeLoginPopup} onOpenSignupPopup={openSignupPopup} handleLogin={handleLogin} />}
          {showSignupPopup && <SignupPopup onClose={closeSignupPopup} onOpenLoginPopup={openLoginPopup} handleLogin={handleLogin} />}
        </div>
        <Footer />
      </Router>
    </div>
  );
}

// Prop types validation
Navbar.propTypes = {
  onOpenLoginPopup: PropTypes.func.isRequired
};

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenSignupPopup: PropTypes.func.isRequired
};

SignupPopup.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default App;
