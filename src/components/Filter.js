import styles from "./Filter.module.css";

const Filter = ({ setFilter, filter }) => {
    const handleCategoryChange = (e) => {
      const { id, checked } = e.target;
      setFilter((prev) => ({ ...prev, [id]: checked }));
    };
  
    const handlePriceChange = (e) => {
      setFilter((prev) => ({ ...prev, price: e.target.value }));
    };
  
    return (
      <div className={styles.filter}>
        <h2>Filter</h2>
        <p>Price: {filter.price}</p>
        <input type="range" min="1000" max="100000" value={filter.price} onChange={handlePriceChange} />
        <h2>Category</h2>
        <div className={styles.category}>
          <span><input type="checkbox" id="men" checked={filter.men} onChange={handleCategoryChange} /> Men's Clothing</span>
          <span><input type="checkbox" id="women" checked={filter.women} onChange={handleCategoryChange} /> Women's Clothing</span>
          <span><input type="checkbox" id="jewellery" checked={filter.jewellery} onChange={handleCategoryChange} /> Jewellery</span>
          <span><input type="checkbox" id="electronics" checked={filter.electronics} onChange={handleCategoryChange} /> Electronics</span>
        </div>
      </div>
    );
  };
  export default Filter;