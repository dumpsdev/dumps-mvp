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
        const token = localStorage.getItem('userToken');
        if(token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    },[])

    useEffect(()=>{
        if(authenticated) clearModal();
    },[authenticated])

    const providerValues = {email,setEmail,name,setName,password,setPassword,currentUser,setCurrentUser,authenticated,setAuthenticated,register,setRegister,signInUser,signUpUser,signOutUser,loginModal,setLoginModal,registerModal,setRegisterModal,error,loading};

    function clearModal() {
        setEmail('');
        setName('');
        setPassword('');
        setLoginModal(false);
        setRegisterModal(false);
    }

    async function signInUser(email,password) {
        try {
            setLoading(true);
            setError('');
            const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const token = response.user.accessToken;
            localStorage.setItem('userToken',JSON.stringify(token));
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
            localStorage.removeItem('userToken');
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