const sql = require("./db.js");
// const jwt = require("jsonwebtoken");

// constructor
const Cliente = function(project) {
  this.name = project.name;
  this.username = project.username;
  this.picture = project.picture;
  this.foundation_year = project.foundation_year;
  this.end_year = project.end_year;
  this.bio = project.bio;
  this.type = project.type;
  this.kind = project.kind;
  this.public = project.public;
  this.id_user_creator_fk = project.id_user_creator_fk;
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
