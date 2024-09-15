const Misc = require("../models/misc.model.js");

// Busca todas as Cidades do banco de dados
exports.findAllCities = (req, res) => {
  Misc.getAllCities((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao buscar as Cidades."
      });
    else res.send(data);
  });
};

// Busca todos as Estados do banco de dados
exports.findAllStates = (req, res) => {
  Misc.getAllStates((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao buscar os Estados."
      });
    else res.send(data);
  });
};