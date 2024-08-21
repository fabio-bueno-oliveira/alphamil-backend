const sql = require("./db.js");
// const jwt = require("jsonwebtoken");

// constructor
const Clientes = function(cliente) {
  this.name = cliente.nome;
  this.username = cliente.sobrenome;
};

Clientes.getAll = result => {
  sql.query("SELECT c.id, c.nome, c.endereco, c.endereco_numero, c.endereco_bairro, c.endereco_complemento, cidade.nome AS cidade, estado.nome AS uf, i.id AS interlocutorId, i.nome AS interlocutorNome FROM clientes AS c LEFT JOIN interlocutores AS i ON i.id_cliente = c.id LEFT JOIN cidade ON c.endereco_cidade = cidade.id LEFT JOIN estado ON c.endereco_uf = estado.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("clientes: ", res);
    result(null, res);
  });
};

module.exports = Clientes;
