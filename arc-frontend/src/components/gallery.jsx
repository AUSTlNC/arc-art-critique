
import { Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from "react";
import Comment from "./comment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from '@mui/material/ImageListItem';
import Axios from "axios";
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import ReactLoading from 'react-loading';
import {Loader} from 'semantic-ui-react';
import { display } from '@mui/system';
import useInfiniteScroll from "./useInfiniteScroll";


const ButtonS = styled.button`
font-size: 15;
background:none;
color: white;
border:none;
margin:10;
padding:0;
cursor: pointer;
`;
const ButtonToggle = styled(ButtonS)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['All', 'Artwork', 'Photography'];


export function Gallery(props) {
  const [commentState, setCommentState] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const[sentEntry,setSentEntry]=useState([]);
  const [active, setActive] = useState('All');
  const [ load, setLoading ] = useState(false);
  const[index,setIndex]=useState(0);
  function loadMore(){
    setLoading(true);
console.log('loading more');
    setIndex(index+4);
    setdimage(displayimage.slice(0,index+4));
    console.log(index);
    console.log(dimage);
    setIsFetching(false)
    setLoading(false);
  }
  const [isFetching, setIsFetching] = useState(useInfiniteScroll(loadMore));
  const [dimage,setdimage]=useState([]);
  const[displayimage, setDisplayimage] = useState([]);
  const[errorMessage,setErrMessage]=useState('');
  

  function clickMe(event, entry){
    // event.preventDefault();   
    setCommentState(true);
    setSentEntry(entry);
  }
 

 

  useEffect(() => {
    Axios.get("/api/login").then((response) => {
      if (response.data.loggedIn == true) {
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user.username);
      };
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    });
  }, []);

  useEffect(()=>{
    setLoading(true);
    setDisplayimage(props.image);
    setdimage(displayimage.slice(0,index+2));
    console.log(props.image);
    console.log(displayimage);
    console.log(dimage);
    setLoading(false);
  },[props.image,displayimage]
  );

  function filter(e, type){
    setLoading(true);
    setActive(type);
    console.log(type)
    if (type == 'All'){
      Axios.post("posts/all",3).then((response)=>{
        setDisplayimage(response.data);
        setdimage(displayimage.slice(0,index+2));
        setLoading(false);
      }).catch((error)=> {
        setErrMessage("Error encountered on the server.");
      });
    }
    if (type == 'Artwork'){
      Axios.get('/posts/type?type=artwork')
      .then(function (response) {
        setDisplayimage(response.data['type search']);
        setdimage(displayimage.slice(0,index+2));
      
        setLoading(false);
      }).catch((error)=> {
        setErrMessage("Error encountered on the server.");
      });
    }
    if (type == 'Photography'){
      Axios.get('/posts/type?type=photography')
      .then(function (response) {
        setDisplayimage(response.data['type search']);
        setdimage(displayimage.slice(index,index+2));
      
        setLoading(false);
      }).catch((error)=> {
        setErrMessage("Error encountered on the server.");
      });
    }
  }

  if (dimage.length>0) {
    console.log(dimage);
    return (
      <div>
        <div id='portfolio' className='text-center'>
          <div className='container'> 
            <div className='section-title'>
              <p>
                GALLERY
              </p>
              <br></br>
              <br></br>
              <br></br>
              {(props.page==1&&<p>This is your art space</p>)
          
              ||(props.page==0&&<p>To help an artist gather and give genuine critique anonymously from other artists<br></br>in order to replenish creativity and create better art
              </p> )
              ||(props.page==2&&<p>This is what you critiqued</p>)}
              
            </div> 
            <p>  {errorMessage} </p>

            {props.page?
            <div>
            <p>  {props.message} </p>
            </div>:               
            <div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                
                <ButtonGroup>
                {types.map(type => (
                  <ButtonToggle
                    variant="outline-light"
                    key={type}
                    active={active === type}
                    onClick={
                      (e) => filter(e, type)
                    }
                  > 
                 
                  {type}
                  </ButtonToggle>
                ))}
                </ButtonGroup>
                </div>}
                <p>
                </p>
            <div>
           {props.loaded==false&&load==false? <ImageList variant="masonry" cols={3} gap={8}>
                  {displayimage.map((entry) => (                    
                    <ImageListItem key={entry.image}>
                      {props.loggedIn ? <a onClick={(e) => {clickMe(e, entry)}} ><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a> :
                        <a href='/login'><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a>}
                    </ImageListItem>
                  ))
                  }
                </ImageList>
                :<center style={{marginTop:"7%"}}><ReactLoading/></center>}
            </div>
          </div>
        </div>

        <Comment show={commentState} onShow={() => setCommentState(true)}
          onHide={() => setCommentState(false) } entry={sentEntry} />

      </div>

    )
  } else { //there is a big problem here
    console.log("this case");
    return (
      <div id='portfolio' className='text-center'>
          <div className='container'> 
            <div className='section-title'>
              <p>
                GALLERY
              </p>
              <br></br>
              <br></br>
              <br></br>
              {(props.page==1&&<p>This is your art space</p>)
          
              ||(props.page==0&&<p>To help an artist gather and give genuine critique anonymously from other artists<br></br>in order to replenish creativity and create better art
              </p> )
              ||(props.page==2&&<p>This is what you critiqued</p>)}
              
            </div> 
      {/* <p>  {"We ran out of images for you"} </p> */}
      <center>
      <ReactLoading/>
      </center>
      </div>
      </div>

    )
  }
}
