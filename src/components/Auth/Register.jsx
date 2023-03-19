import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa'
import { AuthContext } from '../../AuthContext';
import AuthErrorMessage from './AuthErrorMessage';
import AuthModal from './AuthModal'
import AuthRedirectModal from './AuthRedirectModal';
import FormAuth from './FormAuth';
import InputAuth from './InputAuth';
import SubmitAuth from './SubmitAuth';

const Register = ({registerFunction}) => {
  const {email,setEmail,password,setPassword,name,setName,error,signUpUser,loading} = useContext(AuthContext);

  function handleSignUp() {
    signUpUser(email,password,name);
  }

  return (
    <AuthModal text="Register">
        <FormAuth>
            <InputAuth 
            id="email" value={email} icon={<AiOutlineMail/>} 
            type="text" placeholder="Email" 
            onChange={({currentTarget}) => setEmail(currentTarget.value) }/>

            <InputAuth icon={<AiOutlineUser/>} value={name} type="text" placeholder="Name" onChange={({currentTarget}) => setName(currentTarget.value) }/>

            <InputAuth id="password" value={password} 
            icon={<FaLock/>} type="password" placeholder="Password" 
            onChange={({currentTarget}) => setPassword(currentTarget.value) }/>

            {error && <AuthErrorMessage>{error}</AuthErrorMessage>}
            {loading ? <SubmitAuth disabled onClick={handleSignUp} text="Loading..."/> : 
              <SubmitAuth onClick={handleSignUp} text="Register"/> 
            }
            <AuthRedirectModal type="register" />
        </FormAuth>
    </AuthModal>
  )
}

export default Register