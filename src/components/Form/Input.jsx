import React from 'react'
import styles from './Form.module.css'


const Input = ({value,setValue,...props}) => {
  return (
    <input type="text" 
            value={value} 
            onChange={({currentTarget}) => setValue(currentTarget.value)} 
            className={styles.formInput} {...props}/>
  )
}

export default Input