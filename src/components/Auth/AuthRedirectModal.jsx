import React, { useContext } from 'react'
import { AuthContext } from '../../AuthContext';
import styles from './Auth.module.css'


const AuthRedirectModal = ({type}) => {
  const {setLoginModal,setRegisterModal} = useContext(AuthContext);

  function handleRegisterRedirect() {
    setRegisterModal(false);
    setLoginModal(true);
  }

  function handleLoginRedirect() {
    setLoginModal(false);
    setRegisterModal(true);
  }

  if(!type || type.includes('login')) {
    return <div onClick={handleLoginRedirect} className={styles.redirectModal}>Don't have an account yet?</div>
  } else {
    return <div onClick={handleRegisterRedirect} className={styles.redirectModal}>Already have an account? Sign in now</div>
  }
}

export default AuthRedirectModal