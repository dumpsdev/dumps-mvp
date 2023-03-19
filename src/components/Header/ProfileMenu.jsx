import React, { useContext } from 'react'
import { AuthContext } from '../../AuthContext';
import styles from './Header.module.css'

const ProfileMenu = () => {
  const {signOutUser} = useContext(AuthContext);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileMenu}>
          Menu
      </div>
      <div onClick={signOutUser} className={`${styles.authActionButton}`}>Logout</div>
    </div>
  )
}

export default ProfileMenu