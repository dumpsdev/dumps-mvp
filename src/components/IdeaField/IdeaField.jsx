import React, { useContext, useState } from 'react'
import { AuthContext } from '../../AuthContext';
import Ideas from '../Ideas/Ideas';
import styles from './IdeaField.module.css'
import IdeaSubmit from './IdeaSubmit';
import SelectFilter from '../Filter/SelectFilter';
import { categories } from '../../data/categories';
import { useEffect } from 'react';

const IdeaField = ({idea,handleChangeIdea,handleClick,activeText,setActiveText,category,setCategory}) => {
    const [submitDisabled,setSubmitDisabled] = useState(true);
    const {authenticated,setLoginModal} = useContext(AuthContext);

    useEffect(()=>{ 
        if(category !== '') {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    },[category]);

    useEffect(()=>{
        if(idea.length === 0) {
            setCategory('');
        }
    },[idea])

    function handleIdeaClick({currentTarget}) {
        if(authenticated) return;
        setLoginModal(true);
        currentTarget.blur();
    }

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
            {idea && 
            <div className={styles.ideaContainerSubmit}>  
                <SelectFilter value={category} setValue={setCategory} options={categories} defaultOption="Select your category"/>
                <IdeaSubmit disabled={submitDisabled} onClick={handleClick} className={styles.ideaSubmit}/>
            </div>
            }
        </div>
    )
}

export default IdeaField