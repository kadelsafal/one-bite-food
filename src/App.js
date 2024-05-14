import './App.css';
import Dashboard from './pages/Dashboard';
import WaiterOrder from './pages/WaiterOrder';
import Login from './pages/Login'; // Import Login component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WaiterSetting from './pages/WaiterSetting';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Route for the Login page */}
          <Route path="/" exact component={Login} />
          {/*ROute for dashboard*/}
          <Route path="/dashboard" component={Dashboard} />
          {/*Route for menu waiter*/}
          <Route path="/waiter-order" component={WaiterOrder} />
          {/*Route for setting*/}
          <Route path="/setting" component={WaiterSetting} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
