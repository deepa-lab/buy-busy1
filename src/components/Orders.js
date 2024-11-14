import React, { useState, useEffect, useCallback } from 'react';
import styles from "./Orders.module.css";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders from Firebase
    const fetchOrders = useCallback(() => {
        try {
            setLoading(true);
            const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
                const fetchedOrders = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(fetchedOrders);
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
        const unsub = fetchOrders();
        return () => unsub(); // Clean up the listener
    }, [fetchOrders]);

    return (
        <div className={styles.container}>
            <h1>Your Orders</h1>
            <h2>Ordered on :-{orders?.[0]?.date}</h2>
            
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <Spinner radius={50} color={"#333"} stroke={2} visible={true} />
                </div>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className={styles.ordersTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.title}</td>
                                <td>&#8377;{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>&#8377;{order.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
