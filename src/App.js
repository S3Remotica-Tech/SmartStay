import React ,{useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from "./Components/FrontPage"
import LoginPage from './Components/LoginPage';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from "./Components/Forgetpass";
import RoyalGrandHostel from './Components/RoyalGrandHostel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import BedDetails from './Pages/Bed';
import DashboardRoomList from './Pages/DashBoardRoomsList';
import PgList from './Pages/PgList';

function App() {


  const state = useSelector(state => state)
 const login = localStorage.getItem("login")

 useEffect (()=>{
  if(state.login.isLoggedIn===true){
    localStorage.setItem("login",true)
  } 
},[state.login.isLoggedIn])


  return (
    <div>
{
  login || state.login.isLoggedIn ?

    
    <Router>
    <Routes>
      <Route index path='/' element={<RoyalGrandHostel />}></Route>
        <Route path='/Bed' element={< BedDetails />} ></Route>
        <Route path='/roomList' element ={<DashboardRoomList/>}/>
        {/* <Route path='/pgList' element ={<PgList/>}/> */}
      </Routes>  
    </Router>
    :
    <Router>
      <Routes>
        <Route index element={<FrontPage />} />
        <Route path="/login-Page" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forget-password" element={< ForgetPassword />} />
      </Routes>
    </Router>
  
}
      
    </div>
  );
}

export default App;

