
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
  } from "react-router-dom";
  import Home from "./home";
  import Login from "./components/login";
  import Homemyposts from "./homemyposts";
  import Homemycomments from "./homemycomments";

  


  import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

  export default function App() {
    // const [session, setSession] = useState(getSessionCookie());
  
    return (
    //   <SessionContext.Provider value={{ session, setSession }}>
        <div className="wrapper" >
          
          {/* <Nav className="appBar"/> */}
          <Router>
            {/* <Link to="/">Home</Link>
           <Link to="/Posts">Posts</Link>
           <Link to="/Login"> Login</Link> */}
           
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/myposts" component={Homemyposts} />
            <Route path="/comments" component={Homemycomments} />
      
            
          </Router>
        </div>
      /* </SessionContext.Provider> */
    );
  }
  