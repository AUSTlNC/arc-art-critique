import React, { useState, useEffect, useContext } from "react";
import GoogleLogin from 'react-google-login';

import {useHistory} from "react-router-dom";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
// import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import { Button,Form,Card } from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogo from "./../googlesign.png";

// import Axios from "axios";
// import { SessionContext, setSessionCookie } from "../components/UserContext";
// import { useHistory } from "react-router";


function Login() {
  const[errorMessage,setErrMessage]=useState('');
  var UserisRegistered = false;
  const [isRegistered, setRegisterState] = useState(true);
  const history=useHistory();
  const [loggedInUser,setLoggedInUser]=useState('');
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // console.log(loginMessage);
  // const history = useHistory();
  // const { setSession } = useContext(SessionContext);
  function handleClicked(e){
    e.preventDefault();
    console.log(UserName, password);
    setPassword(""); setUserName("");
    setRegisterState(!isRegistered);
  }
useEffect(()=>{
  Axios.get("/api/login").then((response)=>{
    if(response.data.loggedIn==true){
      console.log(response.data.user);
      setLoggedInUser(response.data.user.username);
    };
  }).catch((error)=> {
    setErrMessage("Error encountered on the server.");
  });
},[]);
async function Googlelogin(event){
  event.preventDefault();
  // Axios.get('auth/google').then((response)=>{
  //   console.log(response);
  // })
  window.open("http://localhost:9999/auth/google");
  window.close("http://localhost:3000/login");
}
  async function login(event){
    event.preventDefault();
    console.log("signup is called");
    console.log(document.getElementById("username").value);
    let user={
      username:document.getElementById("username").value,
      password:document.getElementById("password").value
    }
    if (isRegistered){
      Axios.defaults.withCredentials=true;
      Axios.post('/api/login',user).then(function(response){
        if(response.data.status=="error"){
          console.log(response.data);
          console.log(response.data.error);
          setErrMessage(response.data.error);
        }
        else{
          setLoggedInUser(response.data.user);
          history.push("/");}
      }).catch((error)=> {
        setErrMessage("Error encountered on the server.");
      });
    }
    else{
    Axios.post('/api/register',user).then(function(response){
      console.log(response);
      if (response.data.status=='error'){
        console.log(response.data);
        console.log(response.data.error);        
        setErrMessage(response.data.error);
        // setRegisterState(true);
      }else{
        setRegisterState(true);
        history.push("/");
      }

    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    });;
  }
  }
  return (

    <div className="login">
<div className="bglogin"></div>
    <p>Arc</p>

   <div className="loginCard" bg='light' >
  
    <form>
  <Form.Group className="mb-3 logingroup textfield" controlId="formBasicEmail">
  {/* <div class="alert alert-danger"><%= message %></div> */}
  <h1 className="logintitle">
                {isRegistered ? "Log In" : "Register"}
              </h1>
              
              <Form.Text style={{color:'red'}}>
          {errorMessage!=""?errorMessage:''}
          </Form.Text>
          <div style={{marginBottom:"10%"}} className="link">
                  <Link style={{fontSize:"1.2rem"}} onClick={handleClicked}>
                    {isRegistered ? "New User? Register" : "Returning User? Login"}
                  </Link>
                </div>
    
    {/* <Form.Label className="loginsubtitle">Email address</Form.Label> */}
    <TextField  value={UserName} id='username' onChange={(e=>setUserName(e.target.value))} size="Normal" className="logininput" type="email" placeholder="Enter email" />
   
  </Form.Group>

  <Form.Group className="mb-3 logingroup textfield" controlId="formBasicPassword">
    {/* <Form.Label>Password</Form.Label> */}
    <TextField id='password' value={password} onChange={(e=>setPassword(e.target.value))} className="logininput" as='input' type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  {!isRegistered?
    <Form.Check type="checkbox" style={{color:"black"}} label="Click this button to agree on the disclaimer" />:<div></div>
  }
    {/* <Form.Check type="checkbox" style={{color:"black"}} label="Click this button to agree on the disclaimer" /> */}
    
  </Form.Group>

  <Form.Group style={{textAlign:'center'}} className="mb-3">
  <div style={{minWidth:'100%',display:'inline'}}>
  <Button onClick={Googlelogin} className="loginbut" variant='light' size="lg" style={{fontSize:"1.5rem",minWidth:'100%',padding:0,position:'static'}}>
  <div style={{display:'inline'}}>
    <img style={{height:'25px',width:"25px",float:"left",display:"inline"}} src={GoogleLogo}></img>
    <span className="buttonText">Sign in with Google</span>
    </div>
    {/* Sign in with Google */}
  </Button>
  </div>

  <div style={{textAlign:'center',minWidth:'100%'}}>
  <Button  onClick={login} style={{fontSize:"1.5rem",minWidth:'100%'}} id="test" className="loginbut" variant="primary" type="submit" size="lg">
  {isRegistered ? "Log In" : "Register"}
  </Button>

  </div>
  </Form.Group>
</form>
</div>
    </div>
  );
}
export default Login;
