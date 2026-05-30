const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const items = [
    { id: 1, brand: 'Sony', name: 'A7IV', category: 'Camera', rating: 4.5 },
    { id: 2, brand: 'Canon', name: '90D', category: 'Camera', rating: 4.2 },
    { id: 3, brand: 'Sony', name: '100mm f/2.8', category: 'Lens', rating: 4.0 },
    { id: 4, brand: 'Sandisk', name: 'Extreme Pro 256GB', category: 'Others', rating: 3.8 },
];

let nextId = 5;

app.get('/', (req, res) => {
    res.render('index', { totalItems: items.length });
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist', { items });
});

app.get('/additem', (req, res) => {
    res.render('additem');
});

app.post('/additem', (req, res) => {
    const { brand, name, category, rating } = req.body;
    items.push({ id: nextId++, brand, name, category, rating: parseFloat(rating) });
    res.redirect('/wishlist');
});

app.get('/edit/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.redirect('/wishlist');
    res.render('edititem', { item });
});

app.post('/edit/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        const { brand, name, category, rating } = req.body;
        item.brand = brand;
        item.name = name;
        item.category = category;
        item.rating = parseFloat(rating);
    }
    res.redirect('/wishlist');
});

app.post('/delete/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) items.splice(index, 1);
    res.redirect('/wishlist');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});