import './App.css';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './pages/Menu';
import Story from './pages/Story';
import Location from './pages/Location';
import Tables from "./pages/Tables";
import Footer from './Components/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='main-content'>
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/Menu" exact component={Menu} />
          <Route path="/Story" exact component={Story} />
          <Route path="/Location" exact component={Location} />
          <Route path="/Tables" exact component={Tables} />
        </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
