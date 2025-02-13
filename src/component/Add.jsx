import React,{useState} from 'react'
import Boton from './Boton'

const Add = ({add}) => {
    const [name,SetName]= useState('');
    return (
        <div>
        <input onChange={(e) => SetName(e.target.value)} value={name} type="text" name="" id="" />
        {name}
        <input type="text" name="" id="" />
        <Boton name="Agregar"/>
        </div>
    )
}

export default Add