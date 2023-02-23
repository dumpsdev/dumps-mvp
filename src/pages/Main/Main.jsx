import React from 'react'
import IdeaField from '../../components/IdeaField/IdeaField'
import styles from './Main.module.css'
import MainSection from '../../components/MainSection/MainSection'
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Main = () => {
  return (
    <MainSection>
        <IdeaField/>
        <h4 className={styles.message}>or explore people's<div className={styles.logo}><Logo/></div></h4>
    </MainSection>    
  )
}

export default Main