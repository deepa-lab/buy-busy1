import React, {useState} from 'react'
import styles from "./SignIn.module.css";
import { getAuth,
    signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    useEffect(()=>{
        if(user){
        navigate("/products");
        }
        else{
        navigate("/")
        }
    },[user])

    const handleSignIn = async () => {
        try {
        const res = await await login(email, password);
        navigate("/products");
        console.log('User signed in successfully!');
        } catch (error) {
        setError(error.message);
        }
        };
        return (
            <div className={styles.container}>
                <div className={styles.heading}><h1>SignIn</h1></div>
                <input placeholder="Enter Email" className={styles.email} onChange={(e)=> setEmail(e.target.value)}/>
                <input placeholder='Enter Password' type='password' className={styles.password} onChange={(e)=> setPassword(e.target.value)}/>
                <button className={styles.button} onClick={handleSignIn}>Sign In</button>
                <a href="/signup" className={styles.link}>Or SignUp instead</a>
                {error && <p>{error}</p>}
            </div>
        )
}

export default SignIn