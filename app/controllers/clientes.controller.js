const Clientes = require("../models/clientes.model.js");

// Busca todos os clientes do banco de dados
exports.findAll = (req, res) => {
  Clientes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao buscar os clientes."
      });
    else res.send(data);
  });
};