const sql = require("./db.js");
// const jwt = require("jsonwebtoken");

// constructor
const Pedido = function(pedido) {
  this.id = pedido.id;
  this.id_pedido_impresso = pedido.id_pedido_impresso;
};

Pedido.getAll = result => {
  sql.query("SELECT p.id, p.id_pedido_impresso, c.nome, p.data_pedido_realizado, p.data_entrega_realizada_1, p.condicoes_de_pagto, COUNT(i.id) AS itens, SUM(i.quantidade) AS quantidade_total_itens, SUM(i.valor) * i.quantidade AS valor_soma_itens, e.nome AS status_entrega FROM `pedidos` AS p LEFT JOIN pedidos_itens AS i ON p.id = i.id_pedido LEFT JOIN clientes AS c ON p.id_cliente = c.id LEFT JOIN entrega_status_nomes AS e ON p.status_entrega = e.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("pedidos: ", res);
    result(null, res);
  });
};

module.exports = Pedido;
