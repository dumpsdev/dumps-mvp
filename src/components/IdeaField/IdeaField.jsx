import React, { useState } from 'react'
import Ideas from '../Ideas/Ideas';
import styles from './IdeaField.module.css'
import IdeaSubmit from './IdeaSubmit';

const IdeaField = ({idea,handleChangeIdea,handleClick,activeText,setActiveText}) => {
    return (
        <div className={styles.ideaContainer}>
            {activeText && <h2 className={styles.ideaText}>Type an idea that you had but will not use</h2>}
            <input
                id="ideaField"
                value={idea}
                onChange={handleChangeIdea}
                onFocus={() => setActiveText(false)}
                onBlur={() => {
                    if(!idea) setActiveText(true)
                }} 
                className={styles.ideaField} 
                type="text" />
            {idea && <IdeaSubmit onClick={handleClick} className={styles.ideaSubmit}/>}
        </div>
    )
}

export default IdeaField