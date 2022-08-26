import {useEffect,useState} from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import API from "./utils/API"
 function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
 
  const submitHandle= e=>{
    e.preventDefault();
    API.login(email,password).then(res=>{
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


  return (
    <div className="App">
     <h1>Navbar placeholder</h1>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<h1>Login Page</h1>}/>
        <Route path="/users/:id" element={<h1>Profile Page</h1>}/>
        <Route path="*" element={<h1>404 page</h1>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
