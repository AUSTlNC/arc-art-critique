import React, { useState,useEffect, useContext } from "react";
import {Modal,FloatingLabel,Form,Row,Col,ToggleButton,ButtonGroup,Container,InputGroup,ListGroup,FormControl} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {Button} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";
import addPost from "./addPost.css";
import { FilePond, File, registerPlugin,Create } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {Grid,TextField} from '@mui/material';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function AddPost(props){
  const [artType,setartType]=useState('artwork');
  const [photoURL,setPhotoURL]=useState(null);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('')
  const [files, setFiles] = useState([]);
  const history=useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const removeSelectedImage = () => {setSelectedImage();};
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };

  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn==true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user);
      };
    })
  },[]);
  const type=[
    {id:'1',value:'artwork'},
    {id:'2',value:'photography'}
  ]

  const cri = [
    {id:'1', value:'Color'},
    {id:'2', value:'Space'},
    {id:'3', value:'Light'},
    {id:'4', value:'Balance'},
    {id:'5', value:'Focus'}
  ]

  const [critique, setCritique] = useState(false);


  function uploadImage(e){
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }


  function upload(){
   console.log(loggedInUser._id);
   console.log(files);
   console.log((document.getElementsByName("files")));

    let post={
      title:document.getElementById('photoID').value,
      description:document.getElementById('description').value,
      artType:artType,
      photoURL:photoURL,
      userinfo:loggedInUser._id
    }

    console.log(post);
    Axios.post('/posts',post).then(function(response){
      console.log(response);
    });
    props.onHide();
    history.push("/");
  }
    return (
    <Modal
    {...props}
    size="lg"
    animation={false}
    centered
  >

  <Modal.Header >
      <Modal.Title id="contained-modal-title-vcenter" >
        Add A New Post
      </Modal.Title>
    </Modal.Header>
  <Grid container style={{ margin:"1.5%"}}>
    <Grid item xs = {6}>
      
      <Form.Group   className="upload-area">
        
      <FilePond
     style={{borderRadius:"20rem"}}
      // stylePanelLayout='integrated'
          className = "filepond--item "
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={1}
          server="/posts/temp"
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
       
      </Form.Group>

    </Grid>

    <Grid className="right" item xs = {6}>
    <div style={{margin:"3% 0 7% 0"}}>
    <TextField id="photoID" label="ADD A TITLE" variant="standard"  size="Normal" style={{display:"block"}} />
      {/* <textarea id = 'photoID' placeholder = "Add A Title">

      </textarea> */}

      {/* <textarea id = 'description' placeholder = "Tell us about your work">

      </textarea> */}
      </div>
      <div >
<TextField
style={{marginTop:"3%"}}
          id="description"
          label="Tell us about your work"
          multiline
          // inputProps={{style: {,fontSize: 20}}} // font size of input text
          // InputLabelProps={{style: {fontSize: 30,marginBottom:"20px"}}} // font size of input label
          defaultValue=""
          variant="standard"
        size="Normal"
        style={{display:"block"}}
       
        />

</div>

        <ButtonGroup style={{borderRadius:"20px"}} className="typebutton mb-2">
        {type.map((choice) => (
          <ToggleButton
          key={choice.id}
          id={`radio-${choice.id}`}
          type="radio"
          variant='outline-secondary'
          name="artType"
          className="artbutton"
          size="lg"
          value={choice.value}
          checked={artType === choice.value}
          onChange={(e) => setartType(e.currentTarget.value)}
        >
          {choice.value}
          </ToggleButton>
            ))}
        </ButtonGroup>

    </Grid>
  </Grid>

  <Modal.Footer>
          <Button onClick={props.onHide}   size="lg" type = 'button' variant = "secondary">Close</Button>
         <Button onClick={upload}  size="lg" type='submit' variant = "secondary">Upload</Button>
  </Modal.Footer>
  </Modal>);
}
export default AddPost;
