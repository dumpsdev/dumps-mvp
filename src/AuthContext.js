import React, { createContext, useEffect, useState } from 'react'
import { firebaseAuth } from './config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";


export const AuthContext = createContext();

export const AuthStorage = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [authenticated,setAuthenticated] = useState(false);
    const [register,setRegister] = useState(false);
    const [error,setError] = useState('');
    const [loginModal,setLoginModal] = useState(false);
    const [registerModal,setRegisterModal] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                setAuthenticated(true);
              setCurrentUser(user);
            } else {
              setCurrentUser(null);
              setAuthenticated(false);
            }
          });
    },[])

    useEffect(()=>{
        if(authenticated) clearModal();
    },[authenticated])

    useEffect(()=>{
        setError('');
        setEmail('');
        setName('');
        setPassword('');
    },[loginModal,registerModal])

    const providerValues = {email,setEmail,name,setName,password,setPassword,currentUser,setCurrentUser,authenticated,setAuthenticated,register,setRegister,signInUser,signUpUser,signOutUser,loginModal,setLoginModal,registerModal,setRegisterModal,error,loading,currentUser};

    function clearModal() {
        setEmail('');
        setName('');
        setPassword('');
        setError('');
        setLoginModal(false);
        setRegisterModal(false);
    }


    async function signInUser(email,password) {
        try {
            setLoading(true);
            setError('');
            const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
            setCurrentUser(response.user);
            setAuthenticated(true);
        } catch(err) {
            setError(err.message.replace('Firebase','').replace(':',''));
            setCurrentUser(null);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    async function signUpUser(email,password,name) {
        try {
            setError('');
            const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            await signInUser(email, password);
        } catch(err) {
            setError(err.message.replace('Firebase','').replace(':',''));
        }
    }

    async function signOutUser() {
        try {
            const response = await signOut(firebaseAuth);
            setAuthenticated(false);
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <AuthContext.Provider 
            value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
}