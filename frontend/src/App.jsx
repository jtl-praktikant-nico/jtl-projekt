<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
=======
import { useState, useEffect } from 'react';
import { getProducts, getProductById } from './products.js';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // --- NEUE STATES FÜR DIE SUCHE ---
  const [searchId, setSearchId] = useState(''); // Speichert, was der User eintippt
  const [singleProduct, setSingleProduct] = useState(null); // Speichert das Suchergebnis

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- DIE SUCH-FUNKTION ---
  async function handleSearch(e) {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt
    if (!searchId) return; // Wenn nichts eingetippt wurde, tu nichts

    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(searchId); // Holt das Produkt per eingegebener ID
      setSingleProduct(data);
    } catch (err) {
      console.error("Produkt nicht gefunden:", err);
      setSingleProduct(null); // Löscht das alte Ergebnis, falls nichts gefunden wurde
      setError(`Produkt mit ID ${searchId} existiert nicht.`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Hardware-Produkte werden geladen...</div>;

  return (
    <div className="app-container">
      <h1>Hardware Planet 24</h1>
      
      {/* --- 1. DAS SUCHFORMULAR --- */}
      <form onSubmit={handleSearch} className="search-bar" style={{ margin: '20px 0' }}>
        <input 
          type="number" 
          placeholder="Produkt ID eingeben..." 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Aktualisiert den State live beim Tippen
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Suchen</button>
      </form>

      {/* Fehlermeldung anzeigen, falls die ID nicht existiert */}
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      {/* --- 2. ANZEIGE DES SUCH-ERGEBNISSES --- */}
      {singleProduct && (
        <div className="search-result" style={{ border: '2px solid #00ffcc', padding: '15px', marginBottom: '30px', background: '#1a1a1a' }}>
          <h2>Suchergebnis:</h2>
          <h3>{singleProduct.name}</h3>
          <p>{singleProduct.description}</p>
          <strong style={{ color: '#00ffcc' }}>{singleProduct.price.toFixed(2)} €</strong>
          <button onClick={() => setSingleProduct(null)} style={{ display: 'block', marginTop: '10px', fontSize: '12px' }}>Schließen</button>
        </div>
      )}

      <hr />

      {/* 3. DEINE NORMALE PRODUKTLISTE */}
      <h2>Alle Produkte</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price.toFixed(2)} €</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
>>>>>>> Stashed changes
