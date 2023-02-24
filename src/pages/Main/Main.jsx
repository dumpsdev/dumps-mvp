import React, { useEffect, useState } from 'react'
import IdeaField from '../../components/IdeaField/IdeaField'
import styles from './Main.module.css'
import MainSection from '../../components/MainSection/MainSection'
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Filter from '../../components/Filter/Filter';
import Ideas from '../../components/Ideas/Ideas';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';

const Main = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [idea,setIdea] = useState('');
    const [activeText,setActiveText] = useState(true);
    const [ideas,setIdeas] = useState([]);
    const types = ['social-media','video','pictures','work','music',''];

    async function getIdeas() {
        const q = query(collection(firebaseDb, 'ideas'));
        const response = await getDocs(q);
        const ideasData = response.docs.map(doc => ({...doc.data(),id:doc.id}));
        setIdeas(ideasData);
    }

    useEffect(()=> {
        getIdeas()
    },[]);

    async function createIdea() {
        try {
            setError('');
            await addDoc(collection(firebaseDb, 'ideas'), {
                type:types[Math.floor(Math.random() * types.length)],
                text: idea
            })
            setSuccess('Idea sent successfully!');
        } catch (error) {
            setError('Unable to send your idea to our servers');
            setSuccess('');
        } finally {
            setIdea('');
            setActiveText(true);
        }
        getIdeas();
    }


    function handleChangeIdea({currentTarget}) {
        setIdea(currentTarget.value);
    }

  return (
    <MainSection>
        <IdeaField 
            idea={idea} 
            handleChangeIdea={handleChangeIdea} 
            handleClick={createIdea}
            activeText={activeText}
            setActiveText={setActiveText}
        />
        <h4 className={styles.message}>or explore people's<div className={styles.logo}><Logo/></div></h4>
        <Filter/>
        <Ideas ideas={ideas}/>
    </MainSection>    
  )
}

export default Main