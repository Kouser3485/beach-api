// server.js
const express = require('express');
const beachData = require('./data.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Get all beaches
app.get('/api/beaches', (req, res) => {
  res.json(beachData);
});

// Get beach by ID
app.get('/api/beaches/:id', (req, res) => {
  const beach = beachData.find(b => b.id === parseInt(req.params.id));
  if (!beach) {
    return res.status(404).json({ message: 'Beach not found' });
  }
  res.json(beach);
});

// Get beach by name (case-insensitive search)
app.get('/api/beaches/search/:name', (req, res) => {
  const beach = beachData.find(b => 
    b.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  if (!beach) {
    return res.status(404).json({ message: 'Beach not found' });
  }
  res.json(beach);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//GET http://localhost:3000/api/beaches
//GET http://localhost:3000/api/beaches/search/goa