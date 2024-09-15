const sql = require("./db.js");
// const md5 = require("md5");
const { sign } = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");

// start nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_SERVICE_HOST,
  port: process.env.SMTP_SERVICE_PORT,
  secure: process.env.SMTP_SERVICE_SECURE,
  auth: {
    user: process.env.SMTP_USER_NAME,
    pass: process.env.SMTP_USER_PASSWORD
  }
});

// constructor
const Usuario = function(user) {
  this.created = user.created;
  this.name = user.name;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
};

Usuario.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newUser });
    // result(null, { id: res.insertId, ...newUser });
    var results = {
      id: res.insertId,
      email: newUser.email,
      status: 1
    }
    const jsontoken = sign({ result: results }, process.env.JWT_SECRET, {
        expiresIn: "30 days" 
    });
    result(null, { id: res.insertId, name: newUser.name, lastname: newUser.lastname, email: newUser.email, token: jsontoken });

    var mailOptions = {
      from: process.env.SMTP_USER_NAME,
      to: newUser.email,
      subject: 'Bem-vindo ao sistema Alphamil!',
      html: '<h1>Bem-vindo ao sistema Alphamil, '+newUser.name+'!</h1><p>Este é o sistema de gerenciamento de clientes e pedidos da Alphamil Brindes</p><p>Admin Alphamil</p><p>alphamil.com.br</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  });
};

Usuario.loginUserByEmail = (email, result) => {
  if (email.indexOf('@') > -1) {
    var loginQuery = `SELECT id, email, password, status FROM users WHERE email = '${email}'`
  }
  sql.query(loginQuery, (err, res) => {
    if (err) {
      console.log(15, "X");
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Usuário encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Usuario;
