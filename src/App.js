import './App.css';
import LeftNavbar from './Components/leftNavbar'; // Import LeftNavbar component
import Dashboard from './pages/Dashboard'; // Import Dashboard component
import WaiterOrder from './pages/WaiterOrder'; // Import WaiterOrder component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <LeftNavbar />
        <div className='main-content'>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/waiter-order" exact component={WaiterOrder} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
