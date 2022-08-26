import { isContentEditable } from '@testing-library/user-event/dist/utils';
import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import IconEditor from '../../components/IconEditor';
import UserIcon from '../../components/UserIcon';
import API from '../../utils/API';
import "./style.css"

export default function Profile(props) {
    const {id} = useParams()
    const [email, setEmail] = useState("")
    const [icons, setIcons] = useState([])
    useEffect(()=>{
        API.getUserById(id).then(res=>res.json()).then(data=>{
            setEmail(data.email);
            setIcons(data.Icons)
        })
    },[id])
  return (
    <div className="Profile">
        <h1>Profile page for {email}</h1>
        {icons?.map(icon=><UserIcon key={icon.id} pixels = {icon.Pixels} name={icon.name}/>)}
        <IconEditor token={props.token}/>
    </div>
  )
}
