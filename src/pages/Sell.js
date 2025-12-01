import React, { useState } from 'react';
import { supabase } from '../services/supabase';

function Sell({ user, navigate }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Please login to sell products</h2>
        <button
          onClick={() => navigate('login')}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!imageFile) {
      setError("Please select an image");
      setLoading(false);
      return;
    }

    try {
      const ext = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = fileName;

      // 1. Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // 3. Insert product row
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          user_id: user.id,
          name,
          price: parseFloat(price),
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      setSuccess("Product listed successfully!");
      setName('');
      setPrice('');
      setImageFile(null);
      setImagePreview(null);

      setTimeout(() => navigate("home"), 1200);

    } catch (err) {
      setError(err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{
        backgroundColor: 'var(--card-bg-color)',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
      }}>
        <h2 style={{ marginTop: 0 }}>List Your Product</h2>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., iPhone 13 Pro"
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'var(--input-bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
          />

          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            required
            min="0"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 45000"
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'var(--input-bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
          />

          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'var(--input-bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '1rem',
                border: '1px solid #ccc'
              }}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#93c5fd' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Listing..." : "List Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sell;
