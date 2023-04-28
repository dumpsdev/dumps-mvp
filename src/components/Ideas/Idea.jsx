import React from 'react'
import styles from './Ideas.module.css'

const Idea = ({type,author,text}) => {
  return (
    <div className={`ideaBox ${type || ''}`}>
        <p className={styles.ideaText}>{text}</p>
        <h4 className={styles.ideaAuthor}>by <span>{author}</span></h4>
    </div>
  )
}

export default Idea