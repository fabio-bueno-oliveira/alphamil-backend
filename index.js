const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Welcome to Alphamil API!');
});

require("./app/routes/clientes.routes.js")(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});