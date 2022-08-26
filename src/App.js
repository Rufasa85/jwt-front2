import {useEffect,useState} from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import API from "./utils/API"
import Navbar from "./components/Navbar"
import Profile from "./pages/Profile"
 function App() {
  
  const [user, setUser] = useState({
    id:0,
    email:''
  })
  const [token, setToken] = useState("")

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    API.checkToken(storedToken).then(res=>{
      if(!res.ok){
       console.log("invalid token!")
       localStorage.removeItem("token")
      }
      else {
        console.log("valid token")
        res.json().then(data=>{
          setToken(storedToken)
          setUser({
            id:data.id,
            email:data.email
          })
        })
      }
    })
  },[])
 
  const submitLoginHandle= (email,password)=>{
    API.login(email,password).then(res=>{
      if(!res.ok){
        setUser({userId:0,email:""});
        setToken("")
        return;
      }
       return res.json()
    }).then(data=>{
      console.log(data)
      setUser({
        id:data.user.id,
        email:data.user.email
      })
      setToken(data.token)
      localStorage.setItem("token",data.token)
     
    })
  }
 
  const submitSignupHandle= (email,password)=>{
    API.signup(email,password).then(res=>{
      if(!res.ok){
        setUser({userId:0,email:""});
        setToken("")
        return;
      }
       return res.json()
    }).then(data=>{
      console.log(data)
      setUser({
        id:data.user.id,
        email:data.user.email
      })
      setToken(data.token)
      localStorage.setItem("token",data.token)
    })
  }

  const logoutClick = ()=>{
    localStorage.removeItem("token");
    setUser({
      id:0,
      email:''
    })
    setToken("")
  }

  return (
    <div className="App">
     <Router>
     <Navbar userId={user.id} logout={logoutClick}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login userId={user.id} handleLogin = {submitLoginHandle} handleSignup={submitSignupHandle}/>}/>
        <Route path="/users/:id" element={<Profile token={token}/>}/>
        <Route path="*" element={<h1>404 page</h1>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
