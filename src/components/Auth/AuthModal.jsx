import React, { useRef } from 'react'
import styles from './Auth.module.css'
import { ReactComponent as Logo } from '../../assets/logo.svg';

const AuthModal = ({children,text}) => {
  return (
    <section data-auth-modal="true" className={`${styles.authModal}`}>
        <div className={styles.authModalContent}>
            <div className={styles.logoContainer}><Logo className={styles.logo}/></div>
            {<h2 className={styles.authTitle}>{text}</h2>}
            {children}
        </div>
    </section>
  )
}

export default AuthModal