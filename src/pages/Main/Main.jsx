import React, { useEffect, useState } from 'react'
import IdeaField from '../../components/IdeaField/IdeaField'
import styles from './Main.module.css'
import MainSection from '../../components/MainSection/MainSection'
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Filter from '../../components/Filter/Filter';
import Ideas from '../../components/Ideas/Ideas';
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firebaseDb } from '../../config/firebase';

const Main = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [idea,setIdea] = useState('');
    const [activeText,setActiveText] = useState(true);
    const [ideaSearch,setIdeaSearch] = useState('');
    const [category,setCategory] = useState('');
    const [sort,setSort] = useState('');
    const [ideas,setIdeas] = useState([]);
    const types = ['social-media','video','pictures','work','music',''];

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

    async function test() {
        // const q = query(collection(firebaseDb, 'ideas'), orderBy('timestamp', 'desc'));
        // const data = response.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   }))
    }

    async function createIdea() {
        try {
            setError('');
            await addDoc(collection(firebaseDb, 'ideas'), {
                type:types[Math.floor(Math.random() * types.length)],
                text: idea,
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


    function handleChangeIdea({currentTarget}) {
        setIdea(currentTarget.value);
    }

    async function filterByIdea(text,type) {
        console.log(type ? 'ok' : 'not ok')
        try {
            setError('');
            const q = type ?query(collection(firebaseDb, 'ideas'), where('text', '>=', text), where('text', '<', text + '\uf8ff'),where('type','==',type)) : query(collection(firebaseDb, 'ideas'), where('text', '>=', text), where('text', '<', text + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(data)
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
        const test = sortDocumentsByTimestamp(ideas,sort);
        console.log(test);
    },[category,sort]);

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
    )
}

export default Main