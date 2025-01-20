import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Login from './component/loginCheck';
import DashboardLayoutBasic  from './component/tolpad';
import Newdash from './component/newdah';
import Orders from './component/oreders';
import Users from './component/user';
import Cartitem from '../component/Cartitem';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tolpad" element={<DashboardLayoutBasic />} />
          <Route path="/newdash" element={<Newdash />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
