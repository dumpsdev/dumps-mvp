import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ReactComponent as Brand } from '../../assets/brand.svg';
import { AuthContext } from '../../AuthContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AuthMenu from './AuthMenu';
import styles from './Header.module.css'
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const {authenticated,createUser,loginModal,registerModal,setLoginModal,setRegisterModal} = useContext(AuthContext);

  window.addEventListener('click', (e) => {
    const {target} = e;
    if(target.dataset.authModal) {
      setLoginModal(false);
      setRegisterModal(false);
    }
  })

  function handleAuthModal({currentTarget}) {
    const modalType = currentTarget.dataset.modal;
    if(modalType == 'login') {
      setLoginModal(true);
      setRegisterModal(false);
    } else {
      setRegisterModal(true);
      setLoginModal(false);
    }
  }

  return (
    <header className={styles.header}>
        <div className={`${styles.headerContainer} container`}>
            <NavLink className={styles.brand} to="/">
                <Brand />
            </NavLink>
            {authenticated ? <ProfileMenu/> : <AuthMenu menuClick={handleAuthModal}/>}
            {loginModal && <Login/>}
            {registerModal && <Register registerFunction={createUser}/>}
        </div>
    </header>
  )
}

export default Header