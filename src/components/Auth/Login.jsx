import React, { useContext, useState } from 'react'
import styles from './Auth.module.css'
import { AiOutlineMail } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import AuthErrorMessage from './AuthErrorMessage';
import AuthModal from './AuthModal'
import FormAuth from './FormAuth';
import InputAuth from './InputAuth';
import SubmitAuth from './SubmitAuth';
import AuthRedirectModal from './AuthRedirectModal';

const Login = ({loginFunction}) => {
  const {error,loading,email,setEmail,password,setPassword,currentUser,signInUser,createUser,loginModal,setLoginModal,setRegisterModal} = useContext(AuthContext);

  function handleSignIn() {
    signInUser(email,password);
  }

  return (
    <AuthModal text="Login">
        <FormAuth>
            <InputAuth 
              icon={<AiOutlineMail/>} 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={({currentTarget}) => setEmail(currentTarget.value)}/>

            <InputAuth 
              icon={<FaLock/>} 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={({currentTarget}) => setPassword(currentTarget.value)}/>

            {error && <AuthErrorMessage>{error}</AuthErrorMessage>}
            {loading ? 
              <SubmitAuth disabled onClick={handleSignIn} text="Loading..."/> : 
              <SubmitAuth onClick={handleSignIn} text="Login"/> }
            <AuthRedirectModal/>
        </FormAuth>
    </AuthModal>
  )
}

export default Login