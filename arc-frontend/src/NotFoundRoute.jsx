import React from 'react'
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';



const PageNotFound = () => {
    return (
        

        <Form.Group style={{textAlign:'center'}} className="mb-3">
        <div style={{minWidth:'100%',display:'inline'}}>
        <h1>    Error 404 - Page Not Found</h1>
        <Link 
        role="button"
        to="/"
        > 
            Back to Home
        </Link> 
      
        </div>
        </Form.Group>


    )
}

export default PageNotFound