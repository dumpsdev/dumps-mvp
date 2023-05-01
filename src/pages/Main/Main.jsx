import React, { useContext, useEffect, useState } from 'react'
import IdeaField from '../../components/IdeaField/IdeaField'
import styles from './Main.module.css'
import MainSection from '../../components/MainSection/MainSection'
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Filter from '../../components/Filter/Filter';
import Ideas from '../../components/Ideas/Ideas';
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { AuthContext } from '../../AuthContext';

const Main = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [idea,setIdea] = useState('');
    const [activeText,setActiveText] = useState(true);
    const [ideaSearch,setIdeaSearch] = useState('');
    const [ideaCategory,setIdeaCategory] = useState('');
    const [category,setCategory] = useState('');
    const [sort,setSort] = useState('');
    const [ideas,setIdeas] = useState([]);
    const [name,setName] = useState('');
    const [ideaLength,setIdeaLength] = useState(0);
    const {currentUser} = useContext(AuthContext);

    function sortDocumentsByTimestamp(documents, sort) {
        const sortedDocuments = documents; 
        sortedDocuments.sort((a, b) => {
          const timestampA = a.timestamp;
          const timestampB = b.timestamp;
          
          if (sort === 'desc') {
            return timestampB - timestampA;
          } else {
            return timestampA - timestampB;
          }
        });
        return sortedDocuments;
    }

    async function getIdeas() {
        try {
            setError('');
            const q = query(collection(firebaseDb, 'ideas'));
            const response = await getDocs(q);
            const ideasData = response.docs.map(doc => ({...doc.data(),id:doc.id}));
            setIdeas(sortDocumentsByTimestamp(ideasData,'asc'));
        } catch {
            setError('We cannot get your idea')
        }
    }

    useEffect(()=> {
        getIdeas();
    },[]);

    async function createIdea() {
        try {
            setError('');
            await addDoc(collection(firebaseDb, 'ideas'), {
                type:ideaCategory,
                text: idea,
                userId:name.length > 0 ? name : 'Anonymous User',
                timestamp:new Date().getTime()
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


    function handleChangeIdea(e) {
        const {currentTarget} = e;
        const maxLength = parseInt(currentTarget.maxLength);
        setIdeaLength(currentTarget.value.length);
        setIdea(currentTarget.value);
        if (ideaLength >= maxLength && e.key !== 'Backspace') {
            e.preventDefault();
        }
    }

    async function filterByIdea(text,type) {
        try {
            setError('');
            const q = type ?query(collection(firebaseDb, 'ideas'), where('text', '>=', text), where('text', '<', text + '\uf8ff'),where('type','==',type)) : query(collection(firebaseDb, 'ideas'), where('text', '>=', text), where('text', '<', text + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setIdeas(data);
        } catch {
            setError('Error to get the ideas')
        }
    }

    async function filterByCategory(type,sort = 'asc') {
        try {
            setError('');
            const q = type ? query(collection(firebaseDb, 'ideas'), where('type', '==', type)) : query(collection(firebaseDb, 'ideas'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setIdeas(sortDocumentsByTimestamp(data,sort));
        } catch (error) {
            setError('Error to get the idea');
        } finally {
            setIdeaSearch('')
        }
    }

    async function randomizeIdeas() {
        try {
            const q = query(collection(firebaseDb, 'ideas'));
            const response = await getDocs(q);
            const data = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })).sort(()=> Math.floor(Math.random() - 0.5));
            setIdeas(data);
            setCategory('');
            setSort('');
        } catch {
            setError('Error to randomize ideas')
        }
    }

    useEffect(()=>{
        filterByCategory(category,sort);
    },[category,sort]);

    return (
        <>
        <MainSection>
            <IdeaField 
                idea={idea} 
                name={name}
                setName={setName}
                category={ideaCategory}
                setCategory={setIdeaCategory}
                handleChangeIdea={handleChangeIdea} 
                handleClick={createIdea}
                activeText={activeText}
                setActiveText={setActiveText}
                ideaLength={ideaLength}
            />
            <h4 className={styles.message}>or explore people's<div className={styles.logo}><Logo/></div></h4>
            <Filter 
                category={category} 
                sort={sort} 
                ideaSearch={ideaSearch} 
                setIdeaSearch={setIdeaSearch} 
                setCategory={setCategory} 
                setSort={setSort} 
                handleSearch={() => filterByIdea(ideaSearch,category) }
                handleShuffle={randomizeIdeas}
            />
            <Ideas ideas={ideas}/>
        </MainSection>   
        </>
    )
}

export default Main