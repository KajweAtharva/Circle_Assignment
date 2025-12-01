import React from 'react';

function ProductModal({ product, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--card-bg-color)',
          borderRadius: '8px',
          borderColor: 'var(--border-color)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: '100%',
            height: '80%',
            objectFit: 'cover',
            backgroundColor: 'var(--bg-color)'
          }}
        />
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ margin: '0 0 0 0' }}>{product.name}</h2>
          <p style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            margin: '0 0 1.5rem 0' 
          }}>
            ₹{parseFloat(product.price).toFixed(2)}
          </p>
          <div style={{ 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '1rem' 
          }}>
            <h3 style={{ 
              margin: '0 0 0.5rem 0', 
              fontSize: '1rem',
              color: 'var(--text-color)'
            }}>
              Seller Information
            </h3>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Name:</strong> {product.profiles?.name}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Phone:</strong> {product.profiles?.phone}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;