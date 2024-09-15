module.exports = app => {
  const clientes = require("../controllers/clientes.controller.js");
  const { checkToken } = require("../auth/token_validation");

  // Retorna todos os Clientes
  app.get("/clientes", clientes.findAll);

  // Cria um novo Cliente
  app.post("/clientes/criar", checkToken, clientes.create);

  // Retorna informações de Cliente por ID
  app.get("/cliente/:idCliente", clientes.findById);
};
