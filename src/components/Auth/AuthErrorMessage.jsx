import React from 'react'
import styles from './Auth.module.css'

const AuthErrorMessage = ({children}) => {
  return (
    <p className={styles.authErrorMessage}>{children}</p>
  )
}

export default AuthErrorMessage