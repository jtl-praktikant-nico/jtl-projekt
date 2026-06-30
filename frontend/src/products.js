const URL = 'http://localhost:5102/api/products';

export async function getProducts() {
    const response = await fetch(URL); // Ruft direkt die richtige URL ab
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const products = await response.json();
    return products;
}

export async function getProductById(id) {
    const response = await fetch(`${URL}/${id}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const product = await response.json();
    return product;
}