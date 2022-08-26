import {useEffect,useState} from "react"
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
    fetch("http://localhost:3001/check-token",{
      headers:{
        Authorization:`Bearer ${storedToken}`
      }
    }).then(res=>{
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
    fetch("http://localhost:3001/login",{
        method:"POST",
        body:JSON.stringify({
          email,
          password
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
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
     <h1>Hello</h1>
     {user.id?<h3>Welcome back, {user.email}</h3>:(
     <>
     
     <h3>Login</h3>
     <form onSubmit={submitHandle}>
      <input name="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button>Login!</button>
     </form>
   </>
   )}
    </div>
  );
}

export default App;
