import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import ProductCard from '../components/ProductCard';

function Home({ setSelectedProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchText.toLowerCase())
);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    console.log('Fetching products...'); // ADD
    
    const { data, error } = await supabase
    .from('products')
    .select(`*,profiles (name, phone)`)
    .order('created_at', { ascending: false });


    console.log('Response data:', data); // ADD
    console.log('Response error:', error); // ADD
    console.log('Full error details:', JSON.stringify(error, null, 2)); // ADD

    if (error) {
        console.error('Fetch error:', error);
        // Show error on screen
        alert(`Error: ${error.message}\nDetails: ${error.details}\nHint: ${error.hint}`);
    }

    if (!error && data) {
        setProducts(data);
    }
    setLoading(false);
    };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        fontSize: '1.2rem',
        color: 'var(--text-color)'
      }}>
        Loading products...
      </div>
    );
  }

  return (
    <div>
        <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 2rem 0 2rem',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
        }}>

            <input 
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                    width: '80%',
                    padding: '12px 12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '20px',
                    backgroundColor: 'var(--input-bg-color)',
                    color: 'var(--text-color)'
                }}
            />


        <h2 style={{ 
            marginBottom: '2rem',
            fontSize: '2rem',
            color: 'var(--text-color)'
        }}>
            All Products
        </h2>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
        }}>
            {products.length === 0 ? (
                <p style={{ color: 'var(--text-color)', fontSize: '1.1rem' }}>
                    No products available yet.
                </p>
                ) : (
                filteredProducts.map(product => (
                    <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                    />
                ))
            )}

            

        </div>
        <h5 style={{color: 'var(--text-color)'}}>
            Contact seller to buy products!
        </h5>
        </div>
    
    <div style={{width: '100%'}}>
        <footer style={styles.footer}>
        <div style={styles.content}>
            <p>© {new Date().getFullYear()} Atharva Kajwe. All rights reserved.</p>
            <p>
            <a href="/privacy" style={styles.link}>Privacy Policy</a> | 
            <a href="/terms" style={styles.link}> Terms & Conditions</a>
            </p>
        </div>
      </footer>
    </div>

    </div>

  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px 0",
    textAlign: "center",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    borderTop: "1px solid var(--border-color)",
  },
  content: {
    fontSize: "0.9rem",
  },
  link: {
    color: "var(--text-color)",
    marginLeft: "8px",
  },
};

export default Home;