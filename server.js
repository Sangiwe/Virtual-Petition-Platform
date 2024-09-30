const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('frontend'));

app.get('/petitions', (req, res) => {
  // Return a sample list of petitions for now
  const petitions = [
    { id: 1, title: 'Petition 1', description: 'This is petition 1' },
    { id: 2, title: 'Petition 2', description: 'This is petition 2' },
  ];
  res.json(petitions);
});

app.post('/petitions', (req, res) => {
  // Create a new petition
  const petition = { id: 3, title: req.body.title, description: req.body.description };
  res.json(petition);
});

app.delete('/petitions/:petitionId', (req, res) => {
  // Delete a petition
  const petitionId = req.params.petitionId;
  res.json({ message: `Petition ${petitionId} deleted` });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});