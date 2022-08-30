import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import { Alert } from "./components/Alert";
import Home from "./components/Home";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from "./Context/notes/NoteState";
import {useState} from 'react';
function App() {
  
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
}
  return (
    <>
    <NoteState>
    <Router>
      <Navbar title="iNotebook"/>
      <div  style={{height:"55px"}}>
      <Alert alert={alert} />
      </div>
      <div className="container"  >
      <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
