const express = require('express');
const random = btoa(Math.floor(Math.random() * 1_000_000_000));

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${random}`);
}, 5000);

const app = express();

app.get('/', (req, res) => {
  const date = new Date();
  return res.send(`${date.toISOString()}: ${random}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});