import React from 'react';

function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--card-bg-color)',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
          {product.name}
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#2563eb' 
        }}>
          ₹{parseFloat(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;