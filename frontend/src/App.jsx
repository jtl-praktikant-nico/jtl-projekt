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

<<<<<<< Updated upstream
useEffect(() => {
    fetch('http://localhost:5102/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])
=======
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

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export default App
=======
export default App;
>>>>>>> Stashed changes
