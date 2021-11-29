import React, { useState,useEffect, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import {Button, Form, Figure} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function Comment(props) {
  // console.log(props.entry._id);
  const [isLiked, setLikeState] = useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  const[errorMessage,setErrMessage]=useState('');
  const[message,setMessage]=useState('');
  const[commentlist,setCommentlist]=useState([]);
  const history=useHistory();
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn==true){
        console.log(response.data.user._id);
        setLoggedIn(true);
        setLoggedInUser(response.data.user._id);
      };
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    }); 
    let post={post_id:props.entry._id};
    console.log(post);
    Axios.post("/comments/all",post).then((response)=>{
      console.log(response.data);
      setCommentlist(response.data);

    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    }); 
   },[props.entry._id]);
  function handleClicked(){
    setLikeState(!isLiked);
  }
  // function empty(){
  //   setCommentlist([]);
  // }
  function comment(e){
  let comment={
    postId:props.entry._id,
    userId:loggedInUser,
    comment:document.getElementById('comment').value
  }
  Axios.post('/comments',comment).then(function(response){
    if(response.data.status=="error"){
      setMessage('');
      setErrMessage(response.data.error);
      console.log(response.data.error);
    }else{
      setMessage("Comment created successfully!");
      setErrMessage('');
    }
    console.log(response.data);
    
  }).catch((error)=> {
    setErrMessage("Error encountered on the server.");
  });
  e.preventDefault();
  // props.onHide();
  //history.push("/");
}

function close(e){
  props.onHide(e); 
  setMessage('');
  setErrMessage('');   
};
function deletep(e){
  // console.log("delete clicked");
  let deletep={
    postId:props.entry._id,
    userId:loggedInUser
  }
  Axios.post('posts/deleteOnePost',deletep).then(function(response){
    if(response.data["error"]){
      setMessage('');
      setErrMessage("delete failed");
      console.log(response.data["delete post"]);
    } 
    
  }).catch((error)=> {
    setErrMessage("Error encountered on the server.");
  });
  props.onHide(e);
  window.location.reload();
}
// console.log(commentlist);
  return (
    <>  
    <Modal {...props}   size="lg" animation={false}  centered >
     
      <Modal.Header closeButton onClick={close}>
        <Modal.Title>Post Detail Page</Modal.Title>
      </Modal.Header>
      <Grid container spacing={2}>
      <Grid  item xs={6} >
    <Figure>
        <Figure.Image
        style={{maxHeight:"500px",borderRadius:"20px",padding:'3%'}}
          alt="171x180"
          src={"data:image/png;base64, " + props.entry.image}
        />        
      </Figure>
      </Grid>
    <Grid item xs={6}>

        <h1 className='titleText'>
        {props.entry.title}  
          </h1>
          <h4 className='secondaryText'>
          {props.entry.description}
          </h4>
          <Form className='commentForm'>
      <Form.Group className="commentBox mb-3" >
    <Form.Control  
      size="lg"
      id='comment'
      placeholder="Leave a comment here"
    />
      </Form.Group>
      <Button className='buttonText' onClick={comment} size="md" variant="secondary" type="submit">
          Comment
        </Button>
     </Form>
     <Form.Text style={{color:'red'}}>
          {errorMessage!=""?errorMessage:''}
          </Form.Text>
      <Form.Text style={{color:'green'}}>
          {message!=""?message:''}
          </Form.Text>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {props.entry.userinfo==loggedInUser && commentlist?
    commentlist.map((comment)=>(
  
      <ListItem style={{paddingLeft:0}} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="anonymous user"r
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {comment.comment}
            </React.Fragment>
          }
        />
      </ListItem>
      
    ))
      :<div></div>
    }
    </List>
    {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {commentlist.map((comment)=>{
      (props.entry.userinfo==loggedInUser)?
      <ListItem style={{paddingLeft:0}} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="anonymous user"r
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {comment.comment}
            </React.Fragment>
          }
        />
      </ListItem>:<div></div>
    })}
    </List> */}
    </Grid>
  </Grid>

 
      
      
 <Modal.Footer>
 {props.entry.userinfo==loggedInUser?
 <Button variant="danger" size="lg" onClick={deletep}>
          Delete
        </Button>:<div></div>}
        <Button variant="outline-secondary" size="lg" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
  
    </Modal>
   
  </>
  )
}

export default Comment;