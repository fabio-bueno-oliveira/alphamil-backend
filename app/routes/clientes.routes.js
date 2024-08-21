module.exports = app => {
  const clientes = require("../controllers/clientes.controller.js");

  // Retorna todos os Clientes
  app.get("/clientes", clientes.findAll);
};
