
import * as React from 'react';
import { useState,useEffect, useContext } from "react";
import { AutoFixOffSharp, Logout } from '@mui/icons-material';
import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";



const style = {
    margin: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    zIndex: 1,
    position: 'fixed',
  }
  

function Navigate(props) {
console.log(props.user);
console.log(props.loggedIn);
console.log(props.myposts);
const[errorMessage,setErrMessage]=useState('');
const history=useHistory();
function Logout(){
  
  Axios.get('/api/logout').catch((error)=> {
    setErrMessage("Error encountered on the server.");
  });
}
function search(){
  
  window.search=document.getElementById('search').value;
  console.log(window.search);
  props.setImage(window.search);
  // history.push("/search");
}
 return (
    
  <Navbar style = {style} bg="dark" expand="lg" variant="dark" 
    >
  <Container >
    <Navbar.Brand className="bartitle" href="/">
      <img src="img/logowhite.png" width='35' height='35' style={{marginTop:"20%"}}/>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="pages-name">
        <Nav.Link href="/">Home</Nav.Link>
        {props.loggedIn?
          <Nav.Link onClick={Logout} href="/">Logout</Nav.Link>
        :
        <Nav.Link href="/login">Login</Nav.Link>
        } 
               
      </Nav>
      {props.page?
      <Form className="search-all d-flex"></Form>
    :
    <Form className="search-all d-flex">
      <FormControl
        style={{fontSize:"1.5rem", marginRight:"2%", marginTop:"7%"}}
        type="search"
        placeholder="Search"
        className="mr-2 search-box"
        aria-label="Search"
        id='search'
      />
      <Button  variant="outline-light" onClick={search} style={{marginTop:"7%"}}>Search</Button>
      </Form>}
    
    </Navbar.Collapse>
    
  </Container>
</Navbar>
  
 );
 }

export default Navigate;
