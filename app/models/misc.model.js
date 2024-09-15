const sql = require("./db.js");

// constructor
const Misc = function(misc) {
  this.name = misc.nome;
};

Misc.getAllCities = result => {
  sql.query("SELECT c.id, c.nome FROM cidade AS c", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Retornadas todas as Cidades do banco de dados");
    result(null, res);
  });
};

Misc.getAllStates = result => {
  sql.query("SELECT e.id, e.nome FROM estado AS e", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Retornados todas as Estados do banco de dados");
    result(null, res);
  });
};

module.exports = Misc;
