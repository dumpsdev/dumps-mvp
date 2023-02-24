import styles from './IdeaField.module.css'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';

const IdeaSubmit = ({onClick}) => {
  return (
    <button onClick={onClick} className={styles.ideaSubmit}>
       <AiOutlineArrowRight/>
    </button>
  )
}

export default IdeaSubmit