const Pedidos = require("../models/pedidos.model.js");

// Busca todos os pedidos
exports.findAll = (req, res) => {
  Pedidos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao buscar os pedidos."
      });
    else res.send(data);
  });
};

// Busca os itens do pedido
exports.findItems = (req, res) => {
  Pedidos.getItems(req.params.pedidoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não encontrado nenhum item para o pedido ${req.params.pedidoId}.`
        });
      } else {
        res.status(500).send({
          message: `Ocorreu um erro ao buscar os itens do pedido ${req.params.pedidoId}.`
        });
      }
    } else res.send(data);
  });
};