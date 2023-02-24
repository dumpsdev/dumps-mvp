import React from 'react'
import Idea from './Idea'
import styles from './Ideas.module.css'

const Ideas = ({ideas}) => {
  return (
    <div className={styles.ideasContainer}>
        {ideas && ideas.map(idea => <Idea key={idea.id} type={idea.type} author={idea.id} text={idea.text}/>)}
    </div>
  )
}

export default Ideas