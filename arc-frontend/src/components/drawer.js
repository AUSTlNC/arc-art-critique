import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import Nav from 'react-bootstrap';
import { Typography } from '@mui/material';
import { useState, useEffect } from "react";
import Axios from "axios";

const style = {
    margin: 0,
    top: 35,
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed', 
    zIndex: 2,
};


export default function TemporaryDrawer() {
    
    
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [state, setState] = React.useState(false);
  const anchor = 'right';
  const[errorMessage,setErrMessage]=useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open});
  };
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn===true){
        console.log(response.data.user._id);
        setLoggedIn(true);
       
        }         
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    });  
   
  },[]);

  const list1 = () => (
    
    <Box
      sx={{ width: 250, bgcolor:"#292929"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      paddingBottom="1600"
      paddingTop="50"
    >
    <List >
          <ListItemButton component="a" href="/myposts">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>MY POSTS</Typography>} />
          </ListItemButton>
         <ListItemButton component="a" href="/comments">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>COMMENTED</Typography>} />
          </ListItemButton>
             
      </List>
    </Box>
  
  );
  const list2 = () => (
    
    <Box
      sx={{ width: 250, bgcolor:"#292929"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      paddingBottom="1600"
      paddingTop="50"
    >
    <List >
          <ListItemButton component="a" href="/Login">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>MY POSTS</Typography>} />
          </ListItemButton>
         <ListItemButton component="a" href="/Login">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>COMMENTED</Typography>} />
          </ListItemButton>
             
      </List>
    </Box>
  
  );

  return (
      
    <div>
        
        <React.Fragment>
         <Fab  size="md"  style={style} onClick={toggleDrawer(true)}>
         <MenuIcon />
         </Fab>
         
          <Drawer           
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}           
          >
            {isLoggedIn? list1():list2()}
          </Drawer>
         
        </React.Fragment>
     
    </div>
  );
}
