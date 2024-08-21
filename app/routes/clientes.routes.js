module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");

  // Retorna todos os Clientes
  app.get("/clientes", clientes.findAll);
};
