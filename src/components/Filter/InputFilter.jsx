import React from 'react'
import { FaSearch } from 'react-icons/fa';
import styles from './Filter.module.css'

const InputFilter = ({type,name,value,setValue,onClick,...props}) => {
  return (
    <div className={styles.inputContainer}>
        <div className={styles.searchIcon} onClick={onClick}>
            <FaSearch />
        </div>
        <input className={styles.input} type={type ? type : 'text'} name={name} value={value} onChange={({currentTarget}) => setValue(currentTarget.value)} {...props} /> 
    </div>
  )
}

export default InputFilter