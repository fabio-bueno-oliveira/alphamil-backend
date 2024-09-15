const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// use cors for requests
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  var allowedOrigins = ['https://alphamil.com.br', 'https://www.alphamil.com.br'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Alphamil API." });
});

require("./app/routes/clientes.routes.js")(app);
require("./app/routes/pedidos.routes.js")(app);
require("./app/routes/usuarios.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});