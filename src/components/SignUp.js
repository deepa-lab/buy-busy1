import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,
signInWithEmailAndPassword } from 'firebase/auth';
import styles from "./SignUp.module.css";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth();
    const handleSignUp = async () => {
    try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up successfully!');
    } catch (error) {
    setError(error.message);
    }
    };
  return (
    <div className={styles.container}>
        <div className={styles.heading}><h1>Sign Up</h1></div>
        <input placeholder="Enter Name" className={styles.email}/>
        <input placeholder="Enter Email" className={styles.email} onChange={(e)=> setEmail(e.target.value)}/>
        <input placeholder='Enter Password' type = "password" className={styles.password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className={styles.button} onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUp