import React,{useState,useEffect} from 'react'
import UserIcon from '../../components/UserIcon';
import API from '../../utils/API';
import "./style.css"

export default function Home() {
    const [recents, setRecents] = useState([]);
    useEffect(() => {
      API.getRecentIcons().then(res=>res.json()).then(data=>{
       setRecents(data);
      })
    }, [])
    
  return (
    <div className="Home">
        <h1>This is the home component!</h1>
        {recents.map(recentIcon=><UserIcon key= {recentIcon.id} name={recentIcon.name} pixels={recentIcon.Pixels}/>)}
    </div>
  )
}
