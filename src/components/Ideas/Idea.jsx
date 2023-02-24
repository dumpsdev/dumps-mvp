import React from 'react'
import styles from './Ideas.module.css'

const Idea = ({type,author,text}) => {
  return (
    <div className={`ideaBox ${type || ''}`}>
        <h4 className={styles.ideaAuthor}>by <span>{author}</span></h4>
        <p className={styles.ideaText}>{text}</p>
    </div>
  )
}

export default Idea