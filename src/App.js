import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import Navbar from './components/Navbar';
import ProductModal from './components/ProductModal';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sell from './pages/Sell';
import './App.css';

function App() {
const [currentPage, setCurrentPage] = useState('home');
const [user, setUser] = useState(null);
const [selectedProduct, setSelectedProduct] = useState(null);

// 🌗 Dark Mode
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
if (darkMode) {
document.body.classList.add("dark");
} else {
document.body.classList.remove("dark");
}
}, [darkMode]);

useEffect(() => {
supabase.auth.getSession().then(({ data: { session } }) => {
setUser(session?.user ?? null);
});

const { data: { subscription } } =
  supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

return () => subscription.unsubscribe();


}, []);

const navigate = (page) => {
setCurrentPage(page);
setSelectedProduct(null);
};

return ( 
    <div className="App"> <Navbar 
     user={user}
     navigate={navigate}
     currentPage={currentPage}
     darkMode={darkMode}
     setDarkMode={setDarkMode}
   />

  <div style={{ paddingTop: '80px' }}>
    {currentPage === 'home' && <Home setSelectedProduct={setSelectedProduct} />}
    {currentPage === 'login' && <Login navigate={navigate} />}
    {currentPage === 'signup' && <Signup navigate={navigate} />}
    {currentPage === 'sell' && <Sell user={user} navigate={navigate} />}
  </div>

  {selectedProduct && (
    <ProductModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  )}
</div>

);
}

export default App;
