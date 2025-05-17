import "../App.css"
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  //use navigate function to redirect the web page
    const navigate = useNavigate();
    //creating the use state 
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
   if (!email || !password) {
    window.alert("Please fill in all fields");
    return;
  }
   const res=await fetch("/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
     email,password
    })
   })
  
  
   const data = await res.json();
 
   if (data) {
    window.alert("login Successful");
    navigate("/Dashboard");
   
  } else {
    window.alert("Invalid credentials");
    console.log("invalid registration");
  }

  }

  return (
    <div>
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
            <h2>Login</h2>
            <form>
               
                <input type="email" name="email" placeholder="Email" 
                value={user.email} onChange={handleInputs} required/>
                <input type="password" name="password" placeholder="Password"
                value={user.password} onChange={handleInputs} required/>
                <button type="submit" class="btn-submit" onClick={Postdata}>log in</button>
            </form>
        </div>
            </React.Fragment>
    </div>
  )
}

export default Login
