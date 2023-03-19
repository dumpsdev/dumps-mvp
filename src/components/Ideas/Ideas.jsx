import React, { useContext } from 'react'
import { AuthContext } from '../../AuthContext'
import Idea from './Idea'
import styles from './Ideas.module.css'

const Ideas = ({ideas}) => {
  const currentEmail = localStorage.getItem('currentEmail');
  return (
    <div className={styles.ideasContainer}>
        {ideas && ideas.map(idea => <Idea key={idea.id} type={idea.type} author={idea.userId} text={idea.text}/>)}
    </div>
  )
}

export default Ideas