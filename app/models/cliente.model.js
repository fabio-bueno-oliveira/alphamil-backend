const sql = require("./db.js");
// const jwt = require("jsonwebtoken");

// constructor
const Cliente = function(cliente) {
  this.name = cliente.nome;
  this.username = cliente.sobrenome;
};

Cliente.getAll = result => {
  sql.query("SELECT * FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("clientes: ", res);
    result(null, res);
  });
};

module.exports = Cliente;
