import React from 'react'
import { NavLink } from 'react-router-dom';
import { ReactComponent as Brand } from '../../assets/brand.svg';
import styles from './Header.module.css'
import ProfileMenu from './ProfileMenu';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={`${styles.headerContainer} container`}>
            <NavLink className={styles.brand} to="/">
                <Brand />
            </NavLink>
            <ProfileMenu/>
        </div>
    </header>
  )
}

export default Header