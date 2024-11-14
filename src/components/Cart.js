import React, { useState, useEffect, useCallback } from 'react';
import styles from './Cart.module.css';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseInit';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  // Fetch data from cart
  const fetchCart = useCallback(() => {
    setLoadingCart(true);
    const unsub = onSnapshot(collection(db, 'cart'), (snapshot) => {
      const fetchedCart = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(fetchedCart);
      setLoadingCart(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = fetchCart();
    return () => unsub();
  }, [fetchCart]);

  // Fetch products
  const fetchProducts = useCallback(() => {
    setLoadingProducts(true);
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
      setLoadingProducts(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = fetchProducts();
    return () => unsub();
  }, [fetchProducts]);

  // Combine cart and products
  useEffect(() => {
    if (!loadingCart && !loadingProducts) {
      const itemsWithQuantity = products.map((product) => {
        const cartItem = cart.find((c) => c.productId === product.id);
        return cartItem ? { ...product, quantity: cartItem.quantity } : null;
      }).filter(item => item !== null);

      setItems(itemsWithQuantity);
    }
  }, [cart, products, loadingCart, loadingProducts]);

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    try {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        await deleteDoc(doc(db, 'cart', cartItem.id)); // Remove from Firestore
        toast.success('Product removed from cart!');
      }
    } catch (err) {
      toast.error('Failed to remove product from cart.');
      console.error('Error removing from cart:', err);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (productId, action) => {
    try {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        const newQuantity = action === 'increment' ? cartItem.quantity + 1 : cartItem.quantity - 1;
        if (newQuantity > 0) {
          await updateDoc(doc(db, 'cart', cartItem.id), {
            quantity: newQuantity
          });
          toast.success(`Quantity updated!`);
        } else {
          removeFromCart(productId); // If quantity reaches 0, remove from cart
        }
      }
    } catch (err) {
      toast.error('Failed to update quantity.');
      console.error('Error updating quantity:', err);
    }
  };

  return (
    <main className={styles.main}>
      {/* Show spinner while loading */}
      {(loadingCart || loadingProducts) && (
        <div className={styles.spinnerContainer}>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
      )}

      <div className={styles.container}>
        {items.length > 0 ? (
          items.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} />
              </div>
              <div className={styles.desc}>
                <p className={styles.title}>{product.title}</p>
                <div className={styles.price}>
                  <p>&#8377;{product.price}</p>
                  <div className={styles.quantity}>
                    <button 
                      className={styles.actions} 
                      onClick={() => updateQuantity(product.id, 'decrement')}>
                        -
                    </button>
                    <span>{product.quantity}</span>
                    <button 
                      className={styles.actions} 
                      onClick={() => updateQuantity(product.id, 'increment')}>
                        +
                    </button>
                  </div>
                </div>
                <button className={styles.btn} onClick={() => removeFromCart(product.id)}>
                  Remove From Cart
                </button>
              </div>
            </div>
          ))
        ) : !loadingCart && !loadingProducts && (
          <h1>Cart is empty!</h1>
        )}
      </div>
      <ToastContainer />
    </main>
  );
};

export default Cart;
