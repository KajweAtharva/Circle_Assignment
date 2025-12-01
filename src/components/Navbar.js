import React from 'react';
import { supabase } from '../services/supabase';
import lightImg from './light.png';
import darkImg from './dark.png';
import logo from './logo.png';
function Navbar({ user, navigate, currentPage, darkMode, setDarkMode }) {
const handleLogout = async () => {
await supabase.auth.signOut();
navigate('home');
};

return (
<nav
style={{
position: 'fixed',
top: 0,
left: 0,
right: 0,
backgroundColor: darkMode ? 'var(--card-bg)' : '#2563eb',
color: 'white',
padding: '1rem 2rem',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
zIndex: 1000,
}}
>

<img src={logo} alt="logo" style={{width: '140px', height: '40px', marginRight: '10px'}}/>



  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <button
      onClick={() => navigate('home')}
      style={{
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        color: 'white',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '1rem',
      }}
    >
      Home
    </button>


    {user ? (
      <>
        <button
          onClick={() => navigate('sell')}
          style={{
            background:'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Sell
        </button>

        <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
                background:'rgba(255,255,255,0.2)',
                padding: '3px 14px',
                border: 'none',
                borderRadius: '6px',
                height: '34.4px',
                cursor: 'pointer',
            }}
            >
            <img 
            src={darkMode ? darkImg : lightImg} 
            alt="theme toggle"
            style={{
                width: '30px',
                height: '30px',
                objectFit: 'contain'
            }}
        />
    </button>

        <button
          onClick={handleLogout}
          style={{
            background: '#dc2626',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => navigate('login')}
          style={{
            background: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate('signup')}
          style={{
            background: 'white',
            border: 'none',
            color: '#2563eb',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          Sign Up
        </button>
      </>
    )}
  </div>
</nav>


);
}

export default Navbar;
