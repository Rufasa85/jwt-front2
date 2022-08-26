import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {
const navigate = useNavigate();
const logMeOut = ()=>{
    props.logout();
    navigate("/")
}
  return (
    <div className="Navbar">
       <Link to ="/">Home</Link>
        {props.userId?(
            <>
                <Link to={`/users/${props.userId}`}>Profile</Link>
                <button onClick={logMeOut}>Logout</button>
            </>):(
                <Link to='/login'>Login/signup</Link>
            )
        }
    </div>
  )
}
