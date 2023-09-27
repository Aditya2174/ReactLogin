import './App.css';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import SignUp from './SignUp';
import ResetPage from './ResetPass';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/reset" element={<ResetPage/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
