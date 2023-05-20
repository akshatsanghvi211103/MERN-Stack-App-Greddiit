import './App.css';
import Container from './components/container';
import TheGreddiits from './pages/theGreddiitsPage';
import Login from './pages/login';
import Register from './pages/register';
import SG from './pages/sg';
import MyGreddiitsPage from './pages/myGreddiitsPage';
import RequestsPage from './pages/joinRequests';
import ReportsPage from './pages/reports';
import Saved from './pages/saved';
import ShowUsers from './pages/showUsers';
import Stats from './pages/stats';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  
  const user = JSON.parse(localStorage.getItem('theuser')) // maybe i can get token and validate it...but I think better is to use the middleware itself to validate it
  // verify token
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={user ? <Container /> : <Navigate to='/login' />}></Route>
          <Route path='/profile' element={user ? < Container /> : <Navigate to='/login' />}></Route>
          <Route path='/mygreddiits' element={user ? < MyGreddiitsPage /> : <Navigate to='/login' />}></Route>
          <Route exact path='/subgreddiits' element={user ? < TheGreddiits /> : <Navigate to='/login' />}></Route>
          <Route exact path='/savedPosts' element={user ? < Saved /> : <Navigate to='/login' />}></Route>
          <Route path='/api/sg/subGreddiits/:name' element={user ? < SG /> : <Navigate to='/login' />}></Route>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}></Route>
          <Route path='/register' element={(!user) ? <Register /> : <Navigate to='/' />}></Route>
          <Route path='/:subG/requests' element={user ? <RequestsPage /> : <Navigate to='/login' />}></Route>
          <Route path='/:subG/reports' element={user ? <ReportsPage /> : <Navigate to='/login' />}></Route>
          <Route path='/:subG/users' element={user ? <ShowUsers /> : <Navigate to='/login' />}></Route>
          <Route path='/:subG/stats' element={user ? <Stats /> : <Navigate to='/login' />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
