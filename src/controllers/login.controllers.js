const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (email.trim() === "" || password.trim() === "")
      return res
        .status(400)
        .json({ msg: "Todos los campos son obligatorios." });
    if (userExist === null)
      return res.status(400).json({ msg: "E-mail o contraseña inválida." });
    const passwordExist = bcrypt.compareSync(password, userExist.password);
    if (!passwordExist)
      return res.status(400).json({ msg: "E-mail o contraseña invalida" });

    const payload = {
      email: userExist.email,
      id: userExist._id,
      role: userExist.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "30d",
    });

    res.status(201).json({
      msg: "Usuario Logueado",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
}

module.exports = {
  loginUser,
};
