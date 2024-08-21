module.exports = app => {
  const pedidos = require("../controllers/pedidos.controller.js");

  // Retorna todos os Pedidos
  app.get("/pedidos", pedidos.findAll);
};
