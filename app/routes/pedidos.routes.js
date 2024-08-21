module.exports = app => {
  const pedidos = require("../controllers/pedidos.controller.js");

  // Retorna todos os pedidos
  app.get("/pedidos", pedidos.findAll);

  // Retorna todos os itens do pedido
  app.get("/pedidos/itens/:pedidoId", pedidos.findItems);
};
