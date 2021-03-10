import React from 'react'


const TextError = (props)=>{

    return <p className="text-danger font-weight-normal"> {props.children} </p>
}

export default  TextError