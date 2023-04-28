import styles from './IdeaField.module.css'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';

const IdeaSubmit = ({onClick,disabled}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.ideaSubmit}>
       <AiOutlineArrowRight/>
    </button>
  )
}

export default IdeaSubmit