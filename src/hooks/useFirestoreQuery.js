import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../config/firebase';

const useFirestoreQuery = (type) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const q = query(collection(firebaseDb, 'ideas'), where('type', '==', type));
    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIdeas(data);
    };
    fetchData();
  }, [type]);

  return ideas;
};

export default useFirestoreQuery;