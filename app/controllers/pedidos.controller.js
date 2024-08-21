const Pedidos = require("../models/pedidos.model.js");

// Busca todos os pedidos do banco de dados
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