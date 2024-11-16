import React from 'react'
import { useAuth } from '../context/AuthContext';
import styles from "./Header.module.css"

const Header = () => {
  const { user } = useAuth();
  return (
    <div className={styles.header}>
    <div className={styles.logo}>
        <a href="/products" className={styles.logoLink}>Busy Buy</a>
    </div>
    <nav className={styles.navbar}>
      <ul>
        <li><a href="/products"><img src="https://cdn-icons-png.flaticon.com/128/619/619153.png" alt="home" className={styles.homeIcon}/><span>Home</span></a></li>
        {user ? (<><li><a href="/orders"><img src="https://cdn-icons-png.flaticon.com/128/1532/1532688.png" alt="my orders" className={styles.homeIcon}/><span>My Orders</span></a></li>
        <li><a href="/cart"><img src="https://cdn-icons-png.flaticon.com/128/891/891462.png" alt="cart" className={styles.homeIcon}/><span>Cart</span></a></li>
        <li><a href="/logout"><img src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png" alt="logout" className={styles.homeIcon}/><span>Logout</span></a></li></>)
        : 
        (<li><a href="/"><img src="https://cdn-icons-png.flaticon.com/128/1432/1432525.png" alt="signin" className={styles.homeIcon}/><span>SignIn</span></a></li>)}
      </ul>
    </nav>
    </div>
  )
}

export default Header