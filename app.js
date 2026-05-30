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
  res.render('index', { totalItems: item.length });
});

app.get('/wishlist', (req, res) => {
  res.render('wishlist', { item });
});

app.get('/additem', (req, res) => {
  res.render('additem');
});

app.post('/additem', (req, res) => {
    const { brand, name, category, rating } = req.body;
    item.push({ id: nextId++, brand, name, category, rating: parseFloat(rating) });
    res.redirect('/wishlist');
});

app.get('/edit/:id', (req, res) => {
    const items = item.find(i => i.id === parseInt(req.params.id));
    if (!items) return res.redirect('/wishlist');
    res.render('edititem', { items });
});

app.post('/edit/:id', (req, res) => {
    const items = item.find(i => i.id === parseInt(req.params.id));
    if (items) {
        const { brand, name, category, rating } = req.body;
        items.brand = brand;
        items.name = name;
        items.category = category;
        items.rating = parseFloat(rating);
    }
    res.redirect('/wishlist');
});

app.post('/delete/:id', (req, res) => {
    const index = item.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {item.splice(index, 1);
        res.redirect('/wishlist');
    }});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});