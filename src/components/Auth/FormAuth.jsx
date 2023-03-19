import React from 'react'
import styles from './Auth.module.css'

const FormAuth = ({children}) => {
  return (
    <form className={styles.formAuth} onSubmit={(e) => e.preventDefault()}>
        {children}
    </form>
  )
}

export default FormAuth