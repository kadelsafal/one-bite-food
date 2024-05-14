
import './App.css';
import Dashboard from './pages/Dashboard';
import WaiterOrder from './pages/WaiterOrder';
import Login from './pages/Login';
import Setting from './pages/WaiterSetting';
import Analytics from './pages/Analytics';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WaiterSetting from './pages/WaiterSetting';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Route for the Login page */}
          <Route path="/" exact component={Login} />
          {/* Route for dashboard */}
          <Route path="/dashboard" component={Dashboard} />
          {/* Route for waiter order */}
          <Route path="/waiter-order" component={WaiterOrder} />
<<<<<<< HEAD
          {/* Route for the Settings page */}
          <Route path="/setting" component={Setting} /> 
          {/* Route for the analytics page */}
          <Route path="/analysis" component={Analytics} /> 
=======
          {/*Route for setting*/}
          <Route path="/setting" component={WaiterSetting} />
>>>>>>> bbfbbbce70c959753c66a67348b795af17f5ecec
        </Switch>
      </Router>
    </div>
  );
}

export default App;
