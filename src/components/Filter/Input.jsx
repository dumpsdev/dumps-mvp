import React from 'react'

const Input = ({type,name,value,setValue}) => {
  return (
    <input type={type || 'text'} name={name} value={value} onChange={({currentTarget}) => setValue(currentTarget.value)} /> 
  )
}

export default Input