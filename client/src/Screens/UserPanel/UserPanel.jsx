import React from 'react';
import NavBar from '../../Component/NavBar';
import { Outlet } from "react-router";

function UserPanel(props) {
    return (
      <div>
              <NavBar/>

<Outlet/>
  

      </div>
       

    );
}

export default UserPanel;