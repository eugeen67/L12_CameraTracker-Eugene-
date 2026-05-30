const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const item = [
    { id: 1, brand: 'Sony', name: 'A7IV', category: 'Camera', rating: 4.5 },
    { id: 2, brand: 'Canon', name: '90D', category: 'Camera', rating: 4.2 },
    { id: 3, brand: 'Sony', name: '100mm f/2.8', category: 'Lens', rating: 4.0 },
    { id: 4, brand: 'Sandisk', name: 'Extreme Pro 256GB', category: 'Others', rating: 3.8 },
];

let nextId = 5;

app.get('/', (req, res) => {
  res.render('index', { cameras: item });
});

app.get('/wishlist', (req, res) => {
  res.render('wishlist', { cameras: item });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});