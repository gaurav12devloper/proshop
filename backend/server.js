import express from 'express';
const port=5000;
import products from './data/products.js';
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product=products.find((p) => p._id===req.params.id);
    res.json(product);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});