import React, { useState } from 'react'
import styles from './IdeaField.module.css'
import IdeaSubmit from './IdeaSubmit';

const IdeaField = () => {
    const [idea,setIdea] = useState();
    const [activeText,setActiveText] = useState(true);

    function handleIdeaText() {
        if(!idea) setActiveText(true)
    }

    return (
        <div className={styles.ideaContainer}>
            {activeText && <h2 onClick={() => document.querySelector('#ideaField').focus()} className={styles.ideaText}>Type an idea that you had but will not use</h2>}
            <input
                id="ideaField"
                onChange={({currentTarget})=> setIdea(currentTarget.value)}
                onFocus={() => setActiveText(false)}
                onBlur={handleIdeaText} 
                className={styles.ideaField} 
                type="text" />
            <IdeaSubmit className={styles.ideaSubmit}/>
        </div>
    )
}

export default IdeaField