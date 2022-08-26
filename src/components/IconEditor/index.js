import React,{useState,useEffect} from 'react'
import API from '../../utils/API'
import "./style.css"

export default function IconEditor(props) {
    const [name, setName] = useState("")
    const [selectedColor, setSelectedColor] = useState("#bada55")
    const [pixels,setPixels] = useState([])
    useEffect(() => {
        const startingPixels =[];
      for(var i =0; i<256;i++){
        startingPixels.push("#ffffff")
      }
      setPixels(startingPixels)
    }, [])

    const colorIn = (i)=>{
        const pixelCopy = [...pixels];
        pixelCopy[i] = selectedColor;
        setPixels(pixelCopy);
    }

    const createIcon=e=>{
        e.preventDefault();
        API.saveNewIcon(props.token,name,pixels).then(res=>res.json()).then(data=>{
            console.log(data);
        })
    }
    
  return (
    <div className="IconEditor">
        <h3>Icon editor component</h3>
    <form onSubmit={createIcon}>
        <input placeholder='name' value={name} onChange={e=>setName(e.target.value)}/>
        <input type="color" value={selectedColor} onChange={e=>setSelectedColor(e.target.value)}/>
        <div className="colorForm">
            {pixels.map((pix,i)=><div key={i} className="pixel" style={{
                backgroundColor:pix
            }} onClick={()=>colorIn(i)}></div>)}
        </div>
        <button>Save!</button>
    </form>
    </div>
    
  )
}
