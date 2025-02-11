import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let items = [
  { id: 1, name: 'qwe3' },
  { id: 2, name: 'qwe2' },
  { id: 3, name: 'qwe1' },
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.json(items);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    items[itemIndex] = { id: id, name: req.body.name };
    res.json(items);
  } else {
    res.status(404).send('Элемент нету');
  }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(item => item.id !== id); 
    res.json(items);
  });
  

app.listen(5000, () => {
  console.log('Server started on port 5000');
});