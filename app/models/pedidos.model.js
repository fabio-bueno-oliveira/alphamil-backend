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

Pedido.getItems = (pedidoId, result) => {
  sql.query(`SELECT i.id AS id_item, i.id_pedido, i.quantidade, prod.nome, m.nome AS material, c1.nome AS cor1, c2.nome AS cor2, i.valor_unit, i.valor_unit * i.quantidade AS valor_total_item, i.observacao_item, i.layout_desenvolvido, i.layout_aprovado, i.layout_imagem_1, i.layout_imagem_2, i.layout_imagem_3 FROM pedidos_itens AS i LEFT JOIN produtos AS prod ON i.id_produto = prod.id LEFT JOIN cores AS c1 ON i.id_cor_1 = c1.id LEFT JOIN cores AS c2 ON i.id_cor_2 = c2.id LEFT JOIN materiais AS m ON i.id_material = m.id WHERE i.id_pedido = ${pedidoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found items: ", res);
      result(null, res);
      return;
    }
    // not found items with the order id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Pedido;
