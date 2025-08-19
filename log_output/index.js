const random = btoa(Math.floor(Math.random() * 1_000_000_000));

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${random}`);
}, 5000);
