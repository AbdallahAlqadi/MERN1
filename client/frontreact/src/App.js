import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Login from './component/loginCheck';
import DashboardLayoutBasic  from './component/tolpad';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tolpad" element={<DashboardLayoutBasic />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
