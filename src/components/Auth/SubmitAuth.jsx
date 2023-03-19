import React from 'react'
import styles from './Auth.module.css'

const SubmitAuth = ({onClick,text,...props}) => {
  return (
    <button {...props} className={styles.submitAuth} onClick={onClick}>{text}</button>
  )
}

export default SubmitAuth