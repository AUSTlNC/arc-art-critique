import { useState, useEffect } from "react";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Navigation from "./components/navigate";
import Add from "./components/add";
import Drawer from "./components/drawer";
import Axios from "axios";
import { getPopoverUtilityClass } from "@mui/material";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Homemyposts = ({children}) => {
  const [landingPageData, setLandingPageData] = useState({});
  const[sentImage,setSentImage]=useState([]);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  const [loggedInUserID,setLoggedInUserID]=useState('');
  const [ load, setLoading ] = useState(true);
  const[message,setMessage]=useState('');
  const[errorMessage,setErrMessage]=useState('');

  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn===true){
        console.log(response.data.user._id);
        setLoggedIn(true);
        setLoggedInUser(response.data.user);
        setLoggedInUserID(response.data.user._id);
        
        let url = `/posts/myPosts?userId=${response.data.user._id}`;
        console.log(url);
        Axios.get(`${url}`)
        .then((response)=>{
          console.log(response.data['user posts search']);
          let image={
            postid:response.data['user posts search']._id,
            postimage:response.data['user posts search'].image       
          };
          setSentImage(response.data['user posts search']);
          setLoading(false);
          if (response.data['user posts search'] == 0){
            setMessage("Start the journey by sharing your first post! :) ")
          }else{
            setMessage("")
          }
        }).catch((error)=> {
          setErrMessage("Error encountered on the server.");
        });
            
        }     
      
    });
    
   
  },[]);


  return (
    <div>
      <Navigation user={loggedInUser} loggedIn={isLoggedIn} page/>
      <Gallery loaded={load} image={sentImage} loggedIn={isLoggedIn} message = {message} error={errorMessage}page={1}/>
      <Add />
      <Drawer />
    </div>
    
  );
};

export default Homemyposts;
