module.exports = app => {
  const misc = require("../controllers/misc.controller.js");

  // Retorna todas as Cidades
  app.get("/cidades", misc.findAllCities);

  // Retorna todos os Estados
  app.get("/estados", misc.findAllStates);
};
