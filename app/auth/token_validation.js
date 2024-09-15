const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // return res.json({
          //   success: 0,
          //   message: "Token inválido"
          // });
          return res.status(401).send({
            message: 'Token inválido'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Acesso negado. Usuário não autorizado."
      });
    }
  }
};