import React from 'react'
import styles from './Header.module.css'

const AuthMenu = ({menuClick}) => {
  return (
    <div className={styles.authMenu}>
        <div data-modal="login" onClick={menuClick} className={styles.authAction}>Login</div>
        <div data-modal="register" onClick={menuClick} className={`${styles.authActionButton}`}>Register</div>
    </div>
  )
}

export default AuthMenu