import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""});
  let history=useNavigate();
  const handleSubmit= async (e)=>{
      e.preventDefault();
      const {name, email, password}=credentials;
      const response = await fetch(`http://localhost:9000/api/auth/createuser`, {
          "method": 'POST',
              
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}) 
          });
          const json=await response.json()
          //redirect and save the auth token
          if (json.success) {
          props.showAlert("Accounts Created Successfully", "success");
          localStorage.setItem('token', json.authToken);
          history("/");
        }
        else{
          props.showAlert("invalid credentials", "danger");
        }
        console.log(json)

  }
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Create an account to use iNotebook</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="name"
          onChange={onChange} minLength={5} required
        />
        </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          onChange={onChange} 
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5}  required />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;
