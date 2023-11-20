const jwt = require("jsonwebtoken");

function validarJWT(req, res, next) {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "no hay token en la peticion",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido.",
    });
  }

  next();
}

module.exports = {
  validarJWT,
};
