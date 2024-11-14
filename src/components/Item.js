// src/components/Item.js
import React, { useState, useCallback, useEffect } from 'react';
import { db } from '../firebaseInit';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Products.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Item = ({ product }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { user} = useAuth();
    const navigate = useNavigate();
    const fetchProducts = useCallback(() => {
        try {
            setLoading(true);
            const unsub = onSnapshot(collection(db, 'cart'), (snapshot) => {
                const fetchedProducts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCart(fetchedProducts);
                setLoading(false);
            });
            return unsub;
        } catch (err) {
            toast.error('Something went wrong!');
            console.error('Firestore error:', err);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsub = fetchProducts();
        return () => unsub();
    }, [fetchProducts]);

    // Function to add product to the cart
    async function addToCart(product) {
        if(!user){
            navigate("/")
          }
          else{
        const existingProduct = cart.find((item) => item.productId === product.id);

        if (existingProduct) {
            // Update the quantity of the existing product in the cart
            const docRef = doc(db, 'cart', existingProduct.id);
            await updateDoc(docRef, {
                quantity: existingProduct.quantity + qty,
            });
            toast.success('Product quantity updated!');
        } else {
            // Add a new product to the cart
            await addDoc(collection(db, 'cart'), {
                productId: product.id,
                quantity: qty,
            });
            toast.success('Product added to cart!');
        }
    }
    }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            {/* // <div className={styles.products}> */}
            {/* Render products if available */}
            {/* {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => ( */}
            <div key={product?.id} className={styles.product}>
                <div className={styles.imageContainer}>
                    <img src={product?.image} alt={product?.title} />
                </div>
                <div className={styles.desc}>
                    <p className={styles.title}>{product?.title}</p>
                    <p className={styles.price}>&#8377;{product?.price}</p>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                </div>
            </div>
            {/* ))
                ) : (
                    <p>No products available</p>
                )} */}
            <ToastContainer />
        </>
    
    ); 
    
};

export default Item;
