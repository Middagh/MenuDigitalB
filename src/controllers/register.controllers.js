const User = require("../models/User");
const bcrypt = require("bcrypt");

async function accountCreation(req, res) {
  const { firstName, lastName, email, password, repeatPassword } =
    req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    )
      return res
        .status(400)
        .json({ msg: "Todos los campos son obligatorios." });
    if (/\d/.test(firstName) || firstName.length < 2 || lastName.length > 24)
      return res.status(400).json({ msg: "Nombre invalido." });
    if (/\d/.test(lastName) || lastName.length < 2 || lastName.length > 24)
      return res.status(400).json({ msg: "Apellido invalido." });

    
    if (!validateEmail(email) || emailExist || email.length > 35)
      return res.status(400).json({ msg: "E-mail no válido." });
    if (password.length <= 5) return res.json({ msg: "Contraseña invalida." });
    if (password !== repeatPassword)
      return res.status(400).json({ msg: "Las contraseña no coinciden" });

    const user = new user(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      msg: "cliente Registrado",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
}
function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = regEx.test(email);
  return validateEmail;
}

module.exports = {
  accountCreation,
};
