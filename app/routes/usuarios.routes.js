module.exports = app => {
  const usuarios = require("../controllers/usuarios.controller.js");
  // const { checkToken } = require("../auth/token_validation");

  app.post("/usuario/criar", usuarios.create);
  app.post("/login", usuarios.loginUser);
  // app.post("/forgotPassword", usuarios.forgotPassword);
  // app.get("/userInfo", checkToken, usuarios.getInfo);
};
