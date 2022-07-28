import React from 'react';
import AdminNavBar from '../../Component/AdminNavBar';
import { Outlet } from "react-router";

function AdminPanel(props) {
    return (
      <div>
              <AdminNavBar/>

            <Outlet/>
  

      </div>
       

    );
}

export default AdminPanel;