import { useState, useEffect } from "react";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Navigation from "./components/navigate";
import Add from "./components/add";
import Drawer from "./components/drawer";
import Axios from "axios";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = ({children}) => {
  const [landingPageData, setLandingPageData] = useState({});
  const[sentImage,setSentImage]=useState([]);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  const [ load, setLoading ] = useState(true);
  const[errorMessage,setErrMessage]=useState('');

  useEffect(() => {
    Axios.post("posts/all",3).then((response)=>{

      let image={
        postid:response.data[0]._id,
        postimage:response.data[0].image
        
      
      }
      setSentImage(response.data);
      console.log(sentImage);
      console.log(response);
      setLoading(false);
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    });
  }, []);
 
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn===true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user.username);
      };
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    });
  },[]);
function setImage(e){
  console.log(e);
  let params={keyword:e};
  Axios.get("posts/fuzzy", {params}).then((response)=>{
    console.log(response.data['fuzzy search']);

    setSentImage(response.data['fuzzy search']);
    console.log(sentImage);
  
  }).catch((error)=> {
    setErrMessage("Error encountered on the server.");
  });
}


  return (
    <div>
      <Navigation setImage={setImage} user={loggedInUser} loggedIn={isLoggedIn}/>
      <Gallery loaded={load} image={sentImage} loggedIn={isLoggedIn} message={''} error={errorMessage}page={0}/>
      <Add />
      <Drawer />
    </div>
    
  );
};

export default Home;
