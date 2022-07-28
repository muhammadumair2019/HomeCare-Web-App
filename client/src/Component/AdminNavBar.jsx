import { AppBar, Toolbar, styled } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #111111;
`;
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const AdminNavBar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

   


    
    const handleLogout = () => {
		localStorage.removeItem("token");
        handleClose()
        window.location = "/";
	  };

  const handleHome = () => {
        handleClose()
        window.location = "/";
	};

  const handleProfile = () => {
        handleClose()
        window.location = "/AdminPanel/Profile";
	};

    const user = JSON.parse(localStorage.getItem("token"))
    
    const user_id = user?.user?.firstName
    
    return (
        <Header position="static">
            <Toolbar>
                
                <Tabs to="AllAds" exact>All Ads</Tabs>
                <Tabs to="AllUsers" exact>All Users</Tabs>
                <Tabs to="adduser" exact>Add User</Tabs>
                
                <Button sx={{
                    color:'white',
                    marginLeft:135
                }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Hey {user_id}!
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>


        
            </Toolbar>
        

            
            </Header>

       
    )
}

export default AdminNavBar;