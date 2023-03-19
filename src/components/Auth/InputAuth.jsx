import React from 'react'
import styles from './Auth.module.css'

const InputAuth = ({type,value,onChange,icon,id,placeholder}) => {
  return (
    <div className={styles.inputAuthContainer}>
        <div className={styles.inputAuthIcon}>
            {icon && icon}
        </div>
        <input id={id} name={id} className={styles.inputAuth} type={type ? type : 'text'} onChange={onChange} value={value} placeholder={placeholder}/>
    </div>
  )
}

export default InputAuth