 import React,{useState} from 'react'
  import "../App.css"
  import { useNavigate } from 'react-router-dom';
  
  const Agent = () => {
    const navigate = useNavigate();
    const[user,setUser]=useState({
     name:"",mobile:"", email:"",password:"" 
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
     const {name,mobile,email,password}=user;
     if(!name || !mobile || !email ||!password){
        window.alert("fill the complete form");
     }
     const res=await fetch("/addagent",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name,mobile,email,password
      })
     })
     const data = await res.json();
     if(!data){
      window.alert("invalid ");
      console.log("invalid registration")
     }
     else{
      window.alert("Agent add successfully")
      navigate('/login');
     }
    }
    return (
      <React.Fragment>
      <div class="navbar">
      <div class="logo">Assignment</div>
      <div> 
          <a href="/Dashboard">Dashboard</a>
          <a href="/agent">Add Agent</a>
           <a href="/upload">Upload CSV</a>
        
      </div>
      <div class="auth-buttons">
         
      </div>
  </div>
  <div class="container">
      <h2>Agent Form</h2>
      <form >
         
          <input type="text" name="name" placeholder="Name" value={user.name}
          onChange={handleInputs} required/>
          <input type="phone" name="mobile" placeholder="mobile" value={user.mobile}
          onChange={handleInputs} required/>
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
  
  
  
export default Agent
