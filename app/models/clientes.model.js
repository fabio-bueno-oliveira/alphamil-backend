const sql = require("./db.js");
// const jwt = require("jsonwebtoken");

// constructor
const Cliente = function(cliente) {
  this.name = cliente.nome;
};

Cliente.getAll = result => {
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

Cliente.create = (newClient, result) => {
  sql.query("INSERT INTO clientes SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Cliente criado: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

Cliente.findById = (idCliente, result) => {
  sql.query(`SELECT c.id, c.nome, c.endereco, c.endereco_numero, c.endereco_bairro, c.endereco_complemento, cidade.nome AS endereco_cidade, estado.nome AS endereco_estado, c.endereco_cep, c.cliente_desde_ano, c.observacoes, c.cadastro_sistema FROM clientes as c LEFT JOIN cidade ON c.endereco_cidade = cidade.id LEFT JOIN estado ON c.endereco_uf = estado.id WHERE c.id = ${idCliente}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Cliente encontrado: ", res[0]?.nome);
      result(null, res[0]);
      return;
    }
    // not found Project with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Cliente;
