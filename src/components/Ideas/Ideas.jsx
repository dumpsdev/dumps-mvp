import React from 'react'
import Idea from './Idea'
import styles from './Ideas.module.css'

const Ideas = () => {
  return (
    <div className={styles.ideasContainer}>
        <Idea type="social-media" author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
        <Idea type="pictures" author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
        <Idea author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
        <Idea type="music" author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
        <Idea type="video" author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
        <Idea type="work" author="Gabriel" text="Lorem ipsum dolor askoaskoasko" />
    </div>
  )
}

export default Ideas