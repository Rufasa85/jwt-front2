import React from 'react'
import "./style.css"
export default function UserIcon(props) {
  return (
    <div className='UserIcon'>
        <h3>{props.name}</h3>
        <div className="icon">
            {props.pixels.map(pix=><div className="pixel" key={pix.id} style={{
                backgroundColor:pix.color
            }}></div>)}
        </div>
    </div>
  )
}
