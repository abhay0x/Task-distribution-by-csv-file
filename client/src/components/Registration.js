  import React,{useState} from 'react'
  import "../App.css"
  import { useNavigate } from 'react-router-dom';
  
  const Registration = () => {
    const navigate = useNavigate();
    const[user,setUser]=useState({
      email:"",password:"" 
    })
    let name,value;
    const handleInputs=(e)=>{
      console.log(e)
      name=e.target.name;
      value=e.target.value;
  
      setUser({...user,[name]:value})
    }
    const Postdata=async(e)=>{
      console.log("hit")
     e.preventDefault()
     const {email,password}=user;
     const res=await fetch("/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email,password
      })
     })
     const data = await res.json();
     if(!data){
      window.alert("invalid registration");
      console.log("invalid registration")
     }
     else{
      window.alert("Registration Successfully")
      navigate('/');
     }
    }
    return (
      <React.Fragment>
      <div class="navbar">
      <div class="logo">Assignment</div>
      <div> 
          <a href="/">Dashboard</a>
         
          
      </div>
      <div class="auth-buttons">
          <a href="/" class="login">Log in</a>
          <a href="/register" class="signup">Sign up</a>
      </div>
  </div>
  <div class="container">
      <h2>Sign Up</h2>
      <form >
         
          <input type="email" name="email" placeholder="Email" value={user.email}
          onChange={handleInputs} required/>
          <input type="password" name="password" placeholder="Password" value={user.password}
          onChange={handleInputs} required/>
          <button type="submit" class="btn-submit" onClick={Postdata}>Register</button>
      </form>
  </div>
      </React.Fragment>
    )
  }
  
  export default Registration
  