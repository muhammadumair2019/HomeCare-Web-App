import MyAds from './Component/MyAds';
import AllAds from './Component/AllAds';

import PostAd from './Component/PostAd';
import EditAd from './Component/EditAd';
import NotFound from './Component/NotFound'; 
import Login from './Screens/Login/Login';
import Signup from './Screens/Signup/Signup';
import UserPanel from './Screens/UserPanel/UserPanel';
import AdminPanel from './Screens/AdminPanel/AdminPanel'
import AdminLogin from './Screens/AdminLogin/AdminLogin'

import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import PasswordReset from './Screens/PasswordReset/ResetPassword';

import Home from './Screens/Home/Home';


import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'; 
import Profile from './Component/Profile';
import EditProfile from './Component/EditProfile';

import AdminControlAds from './Component/AdminControlAds';
import AdminControlUsers from './Component/AdminControlUsers';
import AdminAddUser from './Component/AdminAddUser'
import Contact from './Component/Contact';

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
        <Route path="/Signup" element={<Signup />} ></Route>
        <Route path="/" element={<Navigate replace to="/Home" />} > </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
			  <Route path="/password-reset/:id" element={<PasswordReset />} />
        <Route path='*' element={<NotFound />} />
        

        {user && <Route path="/UserPanel" element={<UserPanel/>}>
            <Route path="myads" element={<MyAds /> } /> 
            <Route path="feed" element={<AllAds /> } /> 
            <Route path="add" element={<PostAd />} /> 
            <Route path="edit/:id" element={<EditAd />} /> 
            <Route path="Profile" element={<Profile />} />
            <Route path="edituser" element={<EditProfile />} />
            <Route path='*' element={<NotFound />} />

 
         
         </Route>
         }

                      <Route path="/AdminPanel" element={<AdminPanel/>}>
                        <Route path="AllAds" element={<AdminControlAds /> } /> 
                        <Route path="AllUsers" element={<AdminControlUsers /> } />
                        <Route path="adduser" element={<AdminAddUser /> } />
                        <Route path='*' element={<NotFound />} />

            
                    
                      </Route>
                     

          
      </Routes>

    </BrowserRouter>
  );
}

export default App;