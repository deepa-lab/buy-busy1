import React, { useState, useEffect, useCallback } from 'react';
import styles from './Products.module.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { useProducts } from '../../context/ProductContext';
import { db } from '../../firebaseInit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';
import Item from '../Item';
import Filter from '../Filter';

const Products = () => {
  const { products, setProducts, searchTerm, setSearchTerm, filteredProducts, setFilteredProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    price: 50000,  // Max price
    men: false,    // Men's Clothing
    women: false,  // Women's Clothing
    jewellery: false, 
    electronics: false,
  });

  // Fetch products from Firestore and listen to updates
  const fetchProducts = useCallback(() => {
    try {
      setLoading(true);
      const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setLoading(false);
      });
      return unsub;
    } catch (err) {
      toast.error('Something went wrong!');
      console.error('Firestore error:', err);
      setLoading(false);
    }
  }, [setProducts, setFilteredProducts]);

  useEffect(() => {
    const unsub = fetchProducts();
    return () => unsub();  // Clean up the listener
  }, [fetchProducts]);

  // Combine search term and filter logic
  useEffect(() => {
    let filtered = products;

    // Apply search term filter
    if (searchTerm !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filters (men, women, jewellery, electronics)
    const selectedCategories = Object.keys(filter).filter(
      (category) => filter[category] && category !== 'price'
    );

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price filter
    filtered = filtered.filter((product) => product.price <= filter.price);

    setFilteredProducts(filtered);
  }, [searchTerm, filter, products, setFilteredProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
    <main className={styles.main}>
      
      {/* Search Section */}
      <div className={styles.search}>
        <input
          placeholder="Search By Name"
          className={styles.searchBox}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <span className={styles.clear} onClick={() => setSearchTerm('')}>x</span>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
      )}

      {/* Main Content Section */}
      {!loading && (
        <div className={styles.container}>
          
          {/* Filter Section */}
          <Filter setFilter={setFilter} filter={filter} />
          
          {/* Product Listing */}
          <div>
            {filteredProducts.length > 0 ? (
              <div className={styles.products}>
                {filteredProducts.map((product) => (
                  <Item key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <h2 className={styles.heading}>No products found</h2>
            )}
          </div>
        </div>
      )}
    </main>
    <ToastContainer/>
  </div>

  );
};

export default Products;
