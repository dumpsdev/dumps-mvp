import styles from './IdeaField.module.css'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';

const IdeaSubmit = () => {
  return (
    <button className={styles.ideaSubmit}>
       <AiOutlineArrowRight/>
    </button>
  )
}

export default IdeaSubmit