// @ts-check

const express = require('express');
const random = btoa(Math.floor(Math.random() * 1_000_000_000).toString());

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${random}`);
}, 5000);

const app = express();

app.get('/', async (req, res) => {
  const date = new Date();
  const data = await fetch('http://ping-pong-svc:3456/pings').then(r => r.text());
  return res.send(`${date.toISOString()}: ${random}.\nPing / Pongs: ${data}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
