const express = require('express');
const fs = require('fs');
const random = btoa(Math.floor(Math.random() * 1_000_000_000));

const isWriter = process.env.WRITER === 'true';

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${random}`);

  if (isWriter) {
    fs.writeFileSync('/data/log.txt', `${date.toISOString()}: ${random}`);
  }
}, 5000);

const app = express();

app.get('/', (req, res) => {
  const data = fs.readFileSync('/data/log.txt', 'utf8');
  res.send(data);
});

if (!isWriter) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}
