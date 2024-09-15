const Cliente = require("../models/clientes.model.js");

// Busca todos os clientes do banco de dados
exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao buscar os clientes."
      });
    else res.send(data);
  });
};

// Cria e salva um novo Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
  }

  // Cria o Cliente
  const cliente = new Cliente({
    nome: req.body.nome,
    endereco: req.body.endereco,
    endereco_numero: req.body.endereco_numero,
    endereco_bairro: req.body.endereco_bairro,
    endereco_complemento: req.body.endereco_complemento,
    endereco_cidade: req.body.endereco_cidade,
    endereco_uf: req.body.endereco_uf,
    endereco_pais: req.body.endereco_pais,
    endereco_cep: req.body.endereco_cep,
    cliente_desde_ano: req.body.cliente_desde_ano,
    observacoes: req.body.observacoes,
    cadastro_sistema: req.body.cadastro_sistema
  });

  // Salvar o cliente no banco de dados
  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao tentar criar o novo Cliente."
      });
    else res.send(data);
  });
};

// Busca um cliente baseado no ID
exports.findById = (req, res) => {
  Cliente.findById(req.params.idCliente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cliente não encontrado com o id ${req.params.idCliente}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao buscar Cliente com o id " + req.params.idCliente
        });
      }
    } else res.send(data);
  });
};