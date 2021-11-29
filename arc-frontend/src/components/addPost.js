import React, { useState,useEffect, useContext } from "react";
import {Modal,FloatingLabel,Form,Row,Col,ToggleButton,ButtonGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";
import { FilePond, File, registerPlugin,Create } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { file } from "@babel/types";
registerPlugin(FilePondPluginImageExifOrientation,FilePondPluginImageResize, FilePondPluginImagePreview,FilePondPluginFileEncode)
function AddPost(props){
  const [artType,setartType]=useState('artwork');
  const [photoURL,setPhotoURL]=useState(null);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  const [files, setFiles] = useState([]);
  const[errorMessage,setErrMessage]=useState('');
  const[clicked,setClicked]=useState(false);
  const history=useHistory();
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn==true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user);
      };
    }).catch((error)=> {
      setErrMessage("Error encountered on the server.");
    }); 
  },[]);
  const type=[
    {id:'1',value:'artwork'},
    {id:'2',value:'photography'}
  ]

  function close(e){
    props.onHide(e); 
    setErrMessage('');   
  };

  function uploadImage(e){
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }
  function upload(){
  //  console.log(FilePond.parse(files[0]));
   console.log(loggedInUser._id);
   console.log(files);
   console.log((document.getElementsByName("files")));
  //  const pond= Create(files,{
  //    maxFiles:1,
  //    allowBrowse:false
  //  })
  
    if (files[0]){
      let post={
        title:document.getElementById('photoID').value,
        description:document.getElementById('description').value,
        artType:artType,
        photoURL:photoURL,
        image:files[0].getFileEncodeBase64String(),
        imageType:files[0].fileType,
        userinfo:loggedInUser._id
      }
      console.log(post);
      setClicked(true);
      Axios.post('/posts',post).then(function(response){

      }).catch((error)=> {
        setErrMessage("Error encountered on the server.");
      }); 
      setErrMessage('');
      props.onHide();
      history.push("/");
    } else{
      setErrMessage("Please upload an image");
    }
  }
    return (
    <Modal
    {...props}
    size="lg"
    animation={false}
    centered
  >
      <Modal.Header closeButton onClick={close}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add A New Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Upload Your Art Here</h4>
        <Form.Text style={{color:'red'}}>
          {errorMessage!=""?errorMessage:''}
          </Form.Text>
        <FloatingLabel  controlId="floatingTextarea" label="Title" className="mb-3">
    <Form.Control id='photoID' as="textarea" placeholder="Leave a comment here" />
  </FloatingLabel>
  <FloatingLabel controlId="floatingTextarea2" label="Description">
    <Form.Control
      id='description'
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
    />
  </FloatingLabel>
  <fieldset>
    <ButtonGroup style={{paddingTop:"2%"}} className="mb-2">
    {type.map((choice) => (
    <ToggleButton
            key={choice.id}
            id={`radio-${choice.id}`}
            type="radio"
            variant='outline-primary'
            name="artType"
  
            value={choice.value}
            checked={artType === choice.value}
            onChange={(e) => setartType(e.currentTarget.value)}
          >
            {choice.value}
          </ToggleButton>
          ))}
          </ButtonGroup>
    <Form.Group>
    <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        server={{
          url:'/posts/temp',
          timeout:7000,
          process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            const id=1234;
            formData.append(fieldName, file, file.name);
            console.log(formData);
            const request = new XMLHttpRequest();
            request.open('POST', '/posts/temp');
            console.log(request);
            console.log(fieldName);
            console.log(files);
            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };
            
            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);
                } else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                }
            };
            console.log(formData);
            request.send(file);
            console.log(files[0]);
            console.log(files[0]["fileType"]);
            // Should expose an abort method so  the request can be cancelled
            return {
                abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();
                    // Let FilePond know the request has been cancelled
                    abort();
                },
            };
        },
          load:"./upload",
          fetch:'./upload'
        }}
        // server="http://localhost:9999/posts/tmp"
        maxFiles={3}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </Form.Group>
  </fieldset>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={close}>Close</Button>
        <Button onClick={upload} type='submit'>Upload</Button>
      </Modal.Footer>
   </Modal>);
}
export default AddPost;