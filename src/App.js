
import './App.css';
import Dashboard from './pages/Dashboard';
import WaiterOrder from './pages/WaiterOrder';
import Login from './pages/Login';
import Setting from './pages/WaiterSetting';
import Analytics from './pages/Analytics';
import { UserProvider } from './Components/UserContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TablePay from './pages/TablePay';
import Menu from './pages/MenuItems';
import Table from './pages/TableItems';

function App() {
  return (
    <UserProvider>
      
    
    <div className="App">
      <Router>
        <Switch>
          {/* Route for the Login page */}
          <Route path="/" exact component={Login} />
          {/* Route for dashboard */}
          <Route path="/dashboard" component={Dashboard} />
          {/* Route for waiter order */}
          <Route path="/waiter-order" component={WaiterOrder} />
          {/* Route for the Settings page */}
          <Route path="/setting" component={Setting} /> 
          {/* Route for the analytics page */}
          <Route path="/analysis" component={Analytics} /> 
          {/* Route for the Payment page */}
          <Route path="/tablePay" component={TablePay} /> 
          {/* Route for the Payment page */}
          <Route path="/MenuTable" component={Menu} /> 
          {/* Route for the Payment page */}
          <Route path="/TableItems" component={Table} /> 
        </Switch>
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
