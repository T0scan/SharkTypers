import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import SharkTyperBox from './SharkTyperBox/SharkTyperBox';
import Login from './Login/Login';
import Register from './Register/Register';
import ErrorPage from './Error/ErrorPage';
import Profile from './Profile/Profile';
import UserContextProvider from './UserContext/UserContext';
import Header from './Header/Header';

function App() {

  return (
  <UserContextProvider>
  <Router>
  <Header/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/race" element={<SharkTyperBox mode="race"/>} />
      <Route path="/practice" element={<SharkTyperBox mode="practice"/>} />
      <Route path="/school" element={<SharkTyperBox mode="school"/>} />
      <Route path="/hardcore" element={<SharkTyperBox mode="hardcore"/>} />
      <Route path="/picture" element={<SharkTyperBox mode="picture"/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/highscores" element={<Home/>} />
      <Route path="/shop" element={<Home/>} />
      <Route element={<ErrorPage/>} />
    </Routes>
  </Router>
  </UserContextProvider>
  )
}

export default App
