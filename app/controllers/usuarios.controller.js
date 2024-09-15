const Usuario = require("../models/usuarios.model.js");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// Criar novo usuário
exports.create = (req, res) => {
  // Validar a requisição
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!"
    });
  }

  // Generate bcrypt salt
  var salt = genSaltSync(10);

  // Create a User
  const user = new Usuario({
    created: dateTime,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashSync(req.body.password, salt)
  });

  // Salva usuário no banco de dados
  Usuario.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o usuário."
      });
    else res.send(data);
  });
};

// Login de usuário
exports.loginUser = (req, res) => {
  const body = req.body;
  Usuario.loginUserByEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.status(401).send({
        message: 'Email ou senha inválidos'
      });
    }
    if (results.status === 0) {
      return res.status(401).send({
        message: 'Usuário inativo.'
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.JWT_SECRET, {
        expiresIn: "30 days" 
      });
      return res.json({
        success: 1,
        id: results.id,
        firstAccess: results.first_access,
        message: "Login realizado com sucesso",
        token: jsontoken
      });
    } else {
      return res.status(401).send({
        message: 'Email ou senha inválidos'
      });
      // return res.json({
      //   success: 0,
      //   data: "Invalid email or password"
      // });
    }
  });
}