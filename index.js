const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ test: 'working phew' });
});

const PORT = process.env.PORT || 5000
app.listen(PORT);